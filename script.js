const $button = document.querySelector("#startButton");
const $stopButton = document.querySelector("#stopButton");

let media;
let mediarecorder;

$button.addEventListener("click", async () => {
  try {
    media = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } },
      audio: true,
    });

    mediarecorder = new MediaRecorder(media, {
      mimeType: "video/webm;codecs=vp8,opus",
    });
    mediarecorder.start();

    const [video] = media.getVideoTracks();
    video.addEventListener("ended", () => {
      stopRecording();
    });

    mediarecorder.addEventListener("dataavailable", (e) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(e.data);
      link.download = "captura.webm";
      link.click();
    });
  } catch (error) {
    console.error("Error al obtener medios: ", error);
  }
});

$stopButton.addEventListener("click", () => {
  stopRecording();
});

function stopRecording() {
  if (mediarecorder && media) {
    mediarecorder.stop();
    const [video] = media.getVideoTracks();
    video.stop();
  }
}
