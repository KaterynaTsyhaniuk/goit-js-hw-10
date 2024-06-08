'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import imageUrl from '../img/error.svg';

const startBtn = document.querySelector('[data-start]');
const clockface = document.querySelector('.timer');
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        iconUrl: '../img/error.svg',
        theme: 'dark',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

////////////////////////////////////////////////////////////////////////////////////
startBtn.addEventListener('click', () => {
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please select a date and time.',
    });
    return;
  }

  const timerFields = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };

  const interval = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    if (diff <= 0) {
      clearInterval(interval);
      iziToast.success({
        title: 'Completed',
        message: 'The countdown has finished!',
      });
      return;
    }
    const time = convertMs(diff);
    updateClockface(timerFields, time);
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const s = 1000;
  const m = s * 60;
  const h = m * 60;
  const d = h * 24;

  // Remaining days
  const days = Math.floor(ms / d);
  // Remaining hours
  const hours = Math.floor((ms % d) / h);
  // Remaining minutes
  const minutes = Math.floor(((ms % d) % h) / m);
  // Remaining seconds
  const seconds = Math.floor((((ms % d) % h) % m) / s);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//////////////////////////////////////////////////////////////////////////////////////

function updateClockface(timerFields, { days, hours, minutes, seconds }) {
  timerFields.days.textContent = String(days).padStart(2, '0');
  timerFields.hours.textContent = String(hours).padStart(2, '0');
  timerFields.minutes.textContent = String(minutes).padStart(2, '0');
  timerFields.seconds.textContent = String(seconds).padStart(2, '0');
}
