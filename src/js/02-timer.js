import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const datetimePickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const INTERVAL = 1000;

startBtn.setAttribute('disabled', '');
flatpickr('#datetime-picker', {
  // minDate: 'today',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});
let pickerDateTime = null;
datetimePickerInput.addEventListener('input', e => {
  startBtn.removeAttribute('disabled');
  const pickerDate = new Date(e.target.value);
  pickerDateTime = pickerDate.getTime();
});
startBtn.addEventListener('click', () => {
  const timerID = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = pickerDateTime - currentTime.getTime();
    if (timeLeft / 1000 < 0) {
      return;
    }
    const unitAmount = convertMs(timeLeft);
    Object.entries(unitAmount).forEach(([unit, amount]) => {
      const output = document.querySelector(`[data-${unit}]`);
      output.textContent = addLeadingZero(amount);
    });
  }, INTERVAL);
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
