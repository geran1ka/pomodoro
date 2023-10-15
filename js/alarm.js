import { state } from "./state.js";

const audio = {
  work: new Audio('audio/to-be-continued.mp3'),
  break: new Audio('audio/san-andreas.mp3'),
  relax: new Audio('audio/deep-end.mp3'),
}

export const alarm = () => {
  audio[state.status].play();

  console.log('play');
}