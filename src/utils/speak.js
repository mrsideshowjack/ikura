function speak(msg) {
  let x = new SpeechSynthesisUtterance(msg);
  window.speechSynthesis.speak(x);
}

export default speak;
