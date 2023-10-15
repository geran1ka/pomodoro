import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js"
import { showTodo, updateTodo } from "./todo.js";
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const seconsdsElem = document.querySelector('.time__seconds');

export const showTime = seconsds => { 
  minutesElem.textContent = addZero(Math.floor(seconsds / 60));
  seconsdsElem.textContent = addZero(seconsds % 60);
}

// const title = document.title;

export const startTimer = () => {
  const countdown = new Date().getTime() + state.timeLeft * 1000;

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    showTime(state.timeLeft);

    // document.title = state.timeLeft;

    if (state.timeLeft > 0 && state.isActive) {
      return;
    }

    // document.title = title;
    clearTimeout(state.timerId);

    if (!(state.timeLeft % 5)) {
      const now = new Date().getTime();
      state.timeLeft = Math.floor((countdown - now) / 1000);
      console.log('синхрон');
    }

    if (state.status === 'work') {
      state.activeTodo.pomodoro += 1;
      updateTodo(state.activeTodo);

      if(state.activeTodo.pomodoro % state.count !== 0) {
        state.status = 'break';
      } else {
        state.status = 'relax';
      }
    } else {
      state.status = 'work'
    }
    alarm();
    state.timeLeft = state[state.status] * 60;
    changeActiveBtn(state.status);
    showTodo();
    startTimer();
    
  }, 1000)

}