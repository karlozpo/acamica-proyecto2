// Api
const apiKey = "HfFHI1IWTIBPUa7JgXcE0M67VgBCex81";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";

// Elementos del HTML con los que vamos a interactuar
const start = document.getElementById("start");
const video = document.querySelector("video");
const record = document.getElementById("record");
const stop = document.getElementById("stop");

// Fefinimos el objeto recorder - tiene que se global para que podamos accederlo en todos los listeners
let recorder;

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,

      video: {
        height: { max: 480 }
      }
    })

    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,

        onGifRecordingStarted: function() {
          console.log("started");
        }
      });
    });
}

function uploadGif(gif) {
  // formateamos el post según las necesidades particulares de la api de giphy
  // la api key se manda en la url
  fetch("https://upload.giphy.com/v1/gifs" + "?api_key=" + apiKey, {
    method: "POST", // or 'PUT'
    body: gif
  })
    .then(res => {
      console.log(res.status);
      if (res.status != 200) {
        uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      // guardar en localStorage
      saveGifLoacalStorage(data.data.id)

    })
    .catch(error => {
      uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
      console.error("Error:", error);
    });
}

function saveGifLoacalStorage(id){
    localStorage.setItem(`${id}`, JSON.stringify(id))
}

// Evento click sobre el boton para iniciar stream
start.addEventListener("click", function() {
  console.log("llamar a la funcion stream");
  getStreamAndRecord();
});

// Evento click para iniciar grabacion
record.addEventListener("click", function() {
  console.log("llamar a la funcion startRecording");
  recorder.startRecording();
});

// Evento click para parar grabacion
stop.addEventListener("click", function() {
  recorder.stopRecording(function() {
    let form = new FormData();
    // creamos nuestro archivo gif
    form.append("file", recorder.getBlob(), "carlos.gif");
    let gifcaptura= document.getElementById("gifCaptura");
    gifcaptura.src = URL.createObjectURL(recorder.getBlob());
    console.log(form.get("file"));
    console.log(recorder.getBlob());
    // subimos nuestro gif
    uploadGif(form);
  });
});
