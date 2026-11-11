const {app,BrowserWindow,ipcMain,session,shell}=require('electron');
const path=require('path');
function createWindow(){
  const win=new BrowserWindow({
    width:1280,height:850,minWidth:880,minHeight:650,
    backgroundColor:'#141414',title:'Hebrew Immersion',
    webPreferences:{
      contextIsolation:true,nodeIntegration:false,sandbox:true,
      preload:path.join(__dirname,'preload.js')
    }
  });
  win.loadFile(path.join(__dirname,'src','index.html'));
  win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  win.webContents.on('will-navigate',(event,url)=>{
    if(url!==win.webContents.getURL())event.preventDefault();
  });
}
ipcMain.handle('ai:ask',async(event,payload)=>{
  const sender=BrowserWindow.fromWebContents(event.sender);
  if(!sender||sender.isDestroyed())throw new Error('Janela inválida.');
  if(!event.sender.getURL().startsWith('file://'))throw new Error('Origem não permitida.');
  if(!payload||typeof payload!=='object')throw new Error('Pedido inválido.');
  const {key,model,question}=payload;
  if(typeof key!=='string'||!/^sk-[A-Za-z0-9_-]{8,}/.test(key)||key.length>300)throw new Error('Chave de API inválida.');
  if(typeof model!=='string'||!/^[-\w.]{2,80}$/.test(model))throw new Error('Modelo inválido.');
  if(typeof question!=='string'||question.trim().length<3||question.length>3000)throw new Error('Pergunta deve ter entre 3 e 3000 caracteres.');
  const ctrl=new AbortController();
  const timeout=setTimeout(()=>ctrl.abort(),30000);
  try{
    const res=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        model,
        instructions:'Você é um professor de hebraico bíblico em português. Explique a gramática com cuidado, diferencie hebraico bíblico do moderno e explicite incertezas. Ajude o aluno a reconhecer palavras sem depender de tradução automática. Não afirme que interpretações especulativas são fatos. Não use Markdown excessivo.',
        input:question,
        max_output_tokens:1200
      }),
      signal:ctrl.signal
    });
    const data=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(data.error?.message||`Erro HTTP ${res.status}`);
    let answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n');
    return {answer:answer||'Sem resposta textual.'};
  } finally{clearTimeout(timeout)}
});
app.whenReady().then(()=>{
 session.defaultSession.setPermissionRequestHandler((wc,permission,callback)=>callback(false));
 createWindow();
 app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
