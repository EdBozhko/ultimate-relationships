import { updateState, state } from '../main.js';

export const timerHandler = (minutesStart = 0, callback = () => {}) => {
  let countDown = 1000 * 60 * minutesStart;
  const step = 1000;

  const dozensOfMinutesContainer = document.querySelector('.timer__dozens_of_minutes');
  const minutesContainer = document.querySelector('.timer__minutes');
  const dozensOfSecondsContainer = document.querySelector('.timer__dozens_of_seconds');
  const secondsContainer = document.querySelector('.timer__seconds');

  let dozensOfMinutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60) / 10);
  let minutes = Math.floor((countDown % (1000 * 10 * 60)) / (1000 * 60));
  let dozensOfSeconds = Math.floor((countDown % (1000 * 60)) / 1000 / 10);
  let seconds = Math.floor((countDown % (1000 * 10)) / 1000);

  dozensOfMinutesContainer.innerHTML = dozensOfMinutes;
  minutesContainer.innerHTML = minutes;
  dozensOfSecondsContainer.innerHTML = dozensOfSeconds;
  secondsContainer.innerHTML = seconds;

  const x = setInterval(() => {
    if (countDown < 0) {
      clearInterval(x);
      callback();
    } else {
      const dozensOfMinutesNew = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60) / 10);
      const minutesNew = Math.floor((countDown % (1000 * 10 * 60)) / (1000 * 60));
      const dozensOfSecondsNew = Math.floor((countDown % (1000 * 60)) / 1000 / 10);
      const secondsNew = Math.floor((countDown % (1000 * 10)) / 1000);

      if (dozensOfMinutes != dozensOfMinutesNew) {
        dozensOfMinutes = dozensOfMinutesNew;
        dozensOfMinutesContainer.innerHTML = dozensOfMinutesNew;
      }

      if (minutes != minutesNew) {
        minutes = minutesNew;
        minutesContainer.innerHTML = minutesNew;
      }

      if (dozensOfSeconds != dozensOfSecondsNew) {
        dozensOfSeconds = dozensOfSecondsNew;
        dozensOfSecondsContainer.innerHTML = dozensOfSecondsNew;
      }

      if (seconds != secondsNew) {
        seconds = secondsNew;
        secondsContainer.innerHTML = secondsNew;
      }

      countDown -= step;
      updateState({ timer: countDown / 1000 / 60 });
    }
  }, 1000);
};
