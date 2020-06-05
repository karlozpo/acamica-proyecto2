function allStorage() {

  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }
console.log(keys);
  return values;
}
allStorage();
// Api
const apiKey = "HfFHI1IWTIBPUa7JgXcE0M67VgBCex81";
const apiBaseUrl = "https://api.giphy.com/v1/gifs/";

// Elementos del HTML con los que vamos a interactuar
const start = document.getElementById("start");
const video = document.querySelector("video");
const record = document.getElementById("record");
const stop = document.getElementById("stop");

const subir = document.getElementById("subir");
const repetir = document.getElementById("repetir");
const listo = document.getElementById("listo");
const copiarLink = document.getElementById("copiarLink");

const botonIniciar2 = document.getElementById("record");
const botonDetener2 = document.getElementById("stop");

record.setAttribute("style","display:none");
botonDetener2.setAttribute("style","display:none");
subir.setAttribute("style","display:none");
repetir.setAttribute("style","display:none");
const form = new FormData();


// Fefinimos el objeto recorder - tiene que se global para que podamos accederlo en todos los listeners
let recorder;
var detenerCamara=null;
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
      detenerCamara=stream;
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
var varidGif;

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
      varidGif = data.data.id ;
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
document.getElementById("contadorFull").setAttribute("style","display:none");
document.getElementById("subiendoGif").setAttribute("style","display:none");
const gifFinal= document.getElementById("gifFinal");
gifFinal.setAttribute("style","display:none");

// Evento click sobre el boton para iniciar stream
start.addEventListener("click", function() {
  console.log("llamar a la funcion stream");
  getStreamAndRecord();
  botonIniciar2.setAttribute("style","display:none");
  start.setAttribute("style","display:none");
  record.setAttribute("style","display:block");
  document.getElementById("tituloT").textContent = "Capturando tu Guifo";
  document.getElementById("contadorFull").setAttribute("style","display:block");
});

// Evento click para iniciar grabacion
record.addEventListener("click", function() {
  console.log("llamar a la funcion startRecording");
  recorder.startRecording();
  record.setAttribute("style","display:none");
  botonDetener2.setAttribute("style","display:block");
  document.getElementById("contadorFull").setAttribute("style","display:block");
  contador();
});
var gifcaptura;
// Evento click para parar grabacion
stop.addEventListener("click", function() {
  document.getElementById("tituloT").textContent = "Vista Previa";

  botonDetener2.setAttribute("style","display:none");
  subir.setAttribute("style","display:block");
  repetir.setAttribute("style","display:block");
  
  recorder.stopRecording(function() {
    // creamos nuestro archivo gif
    form.append("file", recorder.getBlob(), "carlos.gif");
    gifcaptura= document.getElementById("gifCaptura");
    gifcaptura.src = URL.createObjectURL(recorder.getBlob());
    document.getElementById("videoCaptura").setAttribute("style","display:none");
    console.log(form.get("file"));
    console.log(recorder.getBlob());
    detenerCamara.getTracks().forEach(track => track.stop());
    document.getElementById("contadorFull").setAttribute("style","display:none");
  
  });
});

subir.addEventListener("click", function(){
  console.log("subiendo");
   // subimos nuestro gif
  uploadGif(form);
  //detener camara
  subir.setAttribute("style","display:none");
  repetir.setAttribute("style","display:none");
  gifcaptura.setAttribute("style","display:none");
  document.getElementById("subiendoGif").setAttribute("style","display:flex");
  mostrarGifFinal();
});


let mostrarGifFinal= function () {
  setTimeout(function(){ 
    document.getElementById("tituloT").textContent = "Guifo subido con exito";
    document.getElementById("subiendoGif").setAttribute("style","display:none");
    gifFinal.setAttribute("style","display:block");
    gifcaptura.classList.add("contentFinal")
    gifcaptura.setAttribute("style","display:block");
    gifFinal.prepend(gifcaptura);
  }, 2000);
}

repetir.addEventListener("click", function(){
  location.reload();
});

listo.addEventListener("click", function(){
  window.open("index.html",'_self');
});

copiarLink.addEventListener("click", function(){
  let urlGif = "https://media.giphy.com/media/"+ varidGif +"/giphy.gif";
  window.open(urlGif,'_blank');
});

let paso1=document.getElementById("paso1");
paso1.addEventListener("click",function () {
  let ventana1= document.getElementById("ventanaPaso1");
  let ventana2= document.getElementById("gifCreador1");
  ventana1.setAttribute("style","display:none");
  ventana2.setAttribute("style","display:block");

  
})

const contador = function () {
  var seconds = document.getElementById("contador").textContent;
  const countdown = setInterval(function() {
    seconds++;
    if(seconds<10){
      let numero="0";
      let secunderos= seconds.toString();
      let numeroSuma= numero+secunderos;
      document.getElementById("contador").textContent = numeroSuma;
    }
    else{
      document.getElementById("contador").textContent = seconds;
    }
    
    
    if (seconds >= 60) clearInterval(countdown);
}, 1000);
}



function guifos(){
  document.querySelector(".misGifs").style.display= "block";
  if (localStorage.length != 0) {
  for(let i=0; i<=localStorage.length; i++){
      let clave = localStorage.key(i);
      let idGif = localStorage.getItem(clave).slice(1, -1);
      let creadoGif= fetch('https://api.giphy.com/v1/gifs/'+idGif+'?api_key='+ apiKey)
      .then(response => {
      return response.json(); })
      .then(data =>{
              let objeto= data.data.images.fixed_height.url;;
              let imagen = document.createElement("img");
              imagen.src = objeto;
              imagen.className= "imgGuifo";
              let divGuifos = document.querySelector("#imagenesGuifos");
              divGuifos.appendChild(imagen);
           })
           .catch(error => { return error; 
          }); 
          
    }    
}}

guifos();