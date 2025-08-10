let originalBodyPaddingRight = '';
let originalHeaderPaddingRight = '';
let scrollbarWidth;

function getScrollbarWidth() {
  if (scrollbarWidth !== undefined) return scrollbarWidth;

  const tempDiv = document.createElement('div');
  tempDiv.style.overflow = 'scroll';
  tempDiv.style.width = '100px';
  tempDiv.style.height = '100px';
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);

  scrollbarWidth = tempDiv.offsetWidth - tempDiv.clientWidth;
  document.body.removeChild(tempDiv);

  return scrollbarWidth;
}

export function disableScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  originalBodyPaddingRight = getComputedStyle(document.body).paddingRight;
  originalHeaderPaddingRight = getComputedStyle(header).paddingRight;

  const currentBodyPadding = parseFloat(originalBodyPaddingRight) || 0;
  const currentHeaderPadding = parseFloat(originalHeaderPaddingRight) || 0;

  const scrollWidth = getScrollbarWidth();

  document.body.style.paddingRight = (currentBodyPadding + scrollWidth) + 'px';
  header.style.paddingRight = (currentHeaderPadding + scrollWidth) + 'px';

  document.body.classList.add('noscroll');
}

export function enableScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  document.body.style.paddingRight = originalBodyPaddingRight;
  header.style.paddingRight = originalHeaderPaddingRight;

  document.body.classList.remove('noscroll');
}
