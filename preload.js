const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('hebrewAI',{
 ask: payload=>ipcRenderer.invoke('ai:ask',payload)
});
