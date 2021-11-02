import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const datetimePickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

const INTERVAL = 1000;
const SEC_IN_DAY = 60 * 60 * 24;
const SEC_IN_HOUR = 60 * 60;

flatpickr('#datetime-picker', {
  minDate: 'today',
  enableTime: true,
});
let pickerDateTime = null;
datetimePickerInput.addEventListener('input', e => {
  const pickerDate = new Date(e.target.value);
  pickerDateTime = pickerDate.getTime();
});
startBtn.addEventListener('click', () => {
  const timerID = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = pickerDateTime - currentTime.getTime();
    convertToHMS(timeLeft);
  }, INTERVAL);
});
function adjustOutput(unit, unitOutput) {
  unit < 10 ? (unitOutput.textContent = '0' + unit) : (unitOutput.textContent = unit);
}
function convertToHMS(timeLapse) {
  let seconds = (timeLapse / 1000).toFixed(0);
  const days = Math.floor(seconds / SEC_IN_DAY);
  adjustOutput(days, daysOutput);
  //   console.log('days', days);
  const hours = Math.floor((seconds - days * SEC_IN_DAY) / SEC_IN_HOUR);
  adjustOutput(hours, hoursOutput);
  //   console.log('hours', hours);
  const minutes = Math.floor((seconds - days * SEC_IN_DAY - hours * SEC_IN_HOUR) / 60);
  adjustOutput(minutes, minutesOutput);
  //   console.log('minutes', minutes);
  seconds = seconds - days * SEC_IN_DAY - hours * SEC_IN_HOUR - minutes * 60;
  adjustOutput(seconds, secondsOutput);
}
