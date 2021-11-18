import flatpickr from "flatpickr";

import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const timerRef = document.querySelector('.timer');
const fieldRef = document.querySelectorAll('.field').forEach(item => {
item.style.marginRight = '10px'
});

timerRef.style.display = 'flex';
timerRef.style.marginTop = '25px';

btnStart.disabled = true;

let countDown = {};
let currentDate = new Date();
let selectedDate = new Date();


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate > currentDate) {
            btnStart.disabled = false;
        } else {
           window.alert('Please choose a date in the future');
        }
    }
};

flatpickr(document.querySelector('[type="text"]'), options);

btnStart.addEventListener('click', startTimer);

let timerId;

function startTimer() {
    timerId = setInterval(() => {
        currentDate = new Date();
        if (currentDate < selectedDate) {
            countDown = convertMs(selectedDate - currentDate);
            showCountDown(countDown);
        }
    }, 1000);
    btnStart.disabled = true;
};


function showCountDown(countDown) {
    daysRef.textContent = addLeadingZero(countDown.days);
    hoursRef.textContent = addLeadingZero(countDown.hours);
    minutesRef.textContent = addLeadingZero(countDown.minutes);
    secondsRef.textContent = addLeadingZero(countDown.seconds);
};

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

function convertMs(ms) {
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
  
    return { days, hours, minutes, seconds };
  }