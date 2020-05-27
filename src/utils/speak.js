function speak(msg) {
  // TODO replace with IBM Cloud tts
  const utterance = new SpeechSynthesisUtterance(msg);
  // console.table(window.speechSynthesis.getVoices());
  let jpVoice = window.speechSynthesis
    .getVoices()
    .findIndex(voice => voice.lang == "ja-JP");
  utterance.voice = window.speechSynthesis.getVoices()[jpVoice];
  window.speechSynthesis.speak(utterance);
}

export default speak;
