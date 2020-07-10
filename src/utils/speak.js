import { Howl } from "howler";

var previousAudio;
var previousMsg;

export async function speak(msg, slow, useHTMLTTS) {
  if (msg === previousMsg) {
    speakRepeat(slow);
  } else if (useHTMLTTS) {
    speakHTML(msg, slow);
  } else {
    const instance = process.env.VUE_APP_INSTANCE;
    const iam_api_key = process.env.VUE_APP_IAM_API_KEY;

    const voice = "ja-JP_EmiV3Voice";
    const space = "eu-gb";

    let url = `https://api.${space}.text-to-speech.watson.cloud.ibm.com/instances/${instance}/v1/synthesize?voice=${voice}&text=${msg}&accept=audio/mp3`;

    let audio = new Howl({
      xhr: {
        method: "GET",
        headers: {
          Authorization: "Basic " + window.btoa("apikey" + ":" + iam_api_key)
        }
      },
      src: [url],
      format: ["mp3"]
    });
    if (slow) audio.rate = 0.5;
    audio.play();
    previousMsg = msg;
    previousAudio = audio;
    audio.on("end", function() {
      const event = new Event("spoken");
      window.dispatchEvent(event);
    });
  }
}

export function speakRepeat(slow) {
  if (slow) previousAudio.rate = 0.5;
  previousAudio.play();
}

export function speakCorrect(useHTMLTTS) {
  if (useHTMLTTS) speakHTML("正解");
  else {
    let sound = new Howl({
      src: require("../../public/audio/correct.mp3")
    });
    sound.play();
  }
}
export function speakIncorrect(useHTMLTTS) {
  if (useHTMLTTS) speakHTML("違う");
  else {
    let sound = new Howl({
      src: require("../../public/audio/incorrect.mp3")
    });
    sound.play();
  }
}

function speakHTML(msg, slow) {
  const utterance = new SpeechSynthesisUtterance(msg);
  let jpVoice = window.speechSynthesis
    .getVoices()
    .findIndex(voice => voice.lang == "ja-JP");
  utterance.voice = window.speechSynthesis.getVoices()[jpVoice];
  if (slow) utterance.rate = 0.5;
  window.speechSynthesis.speak(utterance);
}
