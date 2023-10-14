import { alarm } from "./alarm.js";
import { declofNum } from "./declofNum.js";
import { state } from "./state.js"

const minutesElem = document.querySelector('.time__minutes');
const seconsdsElem = document.querySelector('.time__seconds');


const showTime = seconsds => {
  minutesElem.textContent = declofNum(Math.floor(seconsds / 60));
  seconsdsElem.textContent = declofNum(seconsds % 60);
}

export const startTimer = () => {
  state.timeLeft -= 1;
  // отобразить на страницу
  showTime(state.timeLeft);

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft <= 0) {
    alarm();
  }
}