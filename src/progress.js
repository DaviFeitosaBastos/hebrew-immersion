/* Validated local persistence. Preserve malformed originals before replacing them. */
const progressRecovery = new Map();
function progressNotice(message) {
  const target = document.querySelector('#persistenceNotice');
  if (target) { target.textContent = message; target.hidden = false; }
}
function readProgress(key, fallback, validate) {
  let raw;
  try {
    raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    if (!validate(value)) throw new Error('Invalid progress');
    return value;
  } catch {
    if (typeof raw === 'string') progressRecovery.set(key, raw);
    progressNotice('Não foi possível ler parte do progresso. O dado original será preservado antes de salvar uma recuperação.');
    return fallback;
  }
}
function writeProgress(key, value) {
  try {
    if (progressRecovery.has(key)) {
      localStorage.setItem(`${key}.recovery.${Date.now()}`, progressRecovery.get(key));
      progressRecovery.delete(key);
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    progressNotice('Não foi possível salvar o progresso neste dispositivo. A ação não foi concluída. Verifique o espaço disponível e tente novamente.');
    return false;
  }
}
function validReviewRow(row) {
  return row && typeof row === 'object' && !Array.isArray(row) &&
    ['repetitions', 'interval', 'due', 'attempts', 'correct'].every(key => Number.isSafeInteger(row[key]) && row[key] >= 0) &&
    Number.isFinite(row.ease) && row.ease >= 1.3 && row.ease <= 4 &&
    row.correct <= row.attempts && row.repetitions <= row.attempts &&
    row.interval <= 3650 && row.due <= 8640000000000000;
}
function emptyReviewRow() {
  return { repetitions: 0, interval: 0, ease: 2.5, due: 0, attempts: 0, correct: 0 };
}
