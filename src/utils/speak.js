import { Howl } from "howler";

var previousAudio;
var previousMsg;

export function speak(msg, slow) {
  if (msg === previousMsg) {
    speakRepeat(slow);
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
  }
}

export function speakRepeat(slow) {
  if (slow) previousAudio.rate = 0.5;
  previousAudio.play();
}

export function speakCorrect() {
  let sound = new Howl({
    src: require("../../public/audio/correct.mp3")
  });
  sound.play();
}
export function speakIncorrect() {
  let sound = new Howl({
    src: require("../../public/audio/incorrect.mp3")
  });
  sound.play();
}
