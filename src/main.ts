import './style.css';

const stacks = document.querySelectorAll(
  '.stack'
) as NodeListOf<HTMLDivElement>;

let stackToMove = 1;
let totalRound = 0;
let lastScrollTop = 0;
const SCREEN_HEIGHT = window.innerHeight;

function addExtraLayer() {
  if (stacks.length < 1) return;
  for (let i = 1; i < stacks.length; i++) {
    const doc = document.createElement('div');
    doc.style.width = '100%';
    doc.style.height = SCREEN_HEIGHT + 'px';
    doc.style.position = 'absolute';
    doc.style.top = SCREEN_HEIGHT * i + 'px';
    document.body.appendChild(doc);
  }
}

document.addEventListener('DOMContentLoaded', addExtraLayer);

document.addEventListener('scroll', (_) => {
  let percentage = Math.floor(
    ((window.scrollY - totalRound * SCREEN_HEIGHT) / SCREEN_HEIGHT) * 100
  );

  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    // downscroll code
    if (percentage > 100) {
      stackToMove = stacks[stackToMove + 1] ? stackToMove + 1 : stackToMove;
      totalRound = stackToMove - 1;
      percentage = 100;
    }
    stacks[stackToMove].style.transform = `translateY(${percentage}%)`;
  } else if (st < lastScrollTop) {
    // upscroll code
    if (percentage < 0) {
      stackToMove = stacks[stackToMove - 1]
        ? stackToMove - 1
        : Math.max(stackToMove, 1);
      totalRound = Math.max(stackToMove - 1, 0);
      percentage = 0;
    }
    stacks[stackToMove].style.transform = `translateY(${percentage}%)`;
  }
  lastScrollTop = st <= 0 ? 0 : st;
  console.log('Stack to move: ' + stackToMove);

  console.log(`PERCENTAGE: ${percentage}%`);
});
