const startBtn = document.querySelector('[data-start]');
const stopBTN = document.querySelector('[data-stop]');
const COLORCHANGE_INTERVAL = 1000;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeColor(color) {
  document.body.style.backgroundColor = color;
}

startBtn.addEventListener('click', () => {
  let color = getRandomHexColor();
  const timerId = setInterval(() => {
    changeColor(color);
  }, COLORCHANGE_INTERVAL);
});
