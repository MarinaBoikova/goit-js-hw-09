import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const textInpRef = document.querySelector('#datetime-picker');

const btnRef = document.querySelector('button[data-start]');
btnRef.disabled = true;

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minuteRef = document.querySelector('span[data-minutes]');
const secondRef = document.querySelector('span[data-seconds]');
const timerRef = document.querySelector('.timer');
const fieldRef = document.querySelectorAll('.field').forEach(item => {
    item.style.marginRight = '10px'
    });
    timerRef.style.display = 'flex';
    timerRef.style.marginTop = '25px';

const addLeadingZero = value => {
  return value.toString().padStart(2, 0);
};

let convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  daysRef.textContent = days;
  hoursRef.textContent = addLeadingZero(hours);
  minuteRef.textContent = addLeadingZero(minutes);
  secondRef.textContent = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() < selectedDates[0].getTime()) {
        btnRef.disabled = false;
    } else {
Notiflix.Notify.failure('Please choose a date in the future');
    }

    btnRef.addEventListener('click', e => {
      let timet = Infinity;
      const timeId = setInterval(() => {
        if (timet <= 1000) {
          clearInterval(timeId);
          return;
        }
        timet = selectedDates[0].getTime() - Date.now();
        const timeDeta = convertMs(timet);
      }, 1000);
    });
  },
};

flatpickr(textInpRef, options);