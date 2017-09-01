(function rem(doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function cal() {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = `${100 * (clientWidth / 320)}px`;
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));
