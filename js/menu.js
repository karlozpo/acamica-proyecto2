///DROPDOWN  SUPERIOR
var x, i, j, selElmnt, a, b, c;
/* Busque cualquier elemento con la clase "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* Para cada elemento, cree un nuevo DIV que actuará como el elemento seleccionado: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* Para cada opción en el elemento de selección original,
    cree un nuevo DIV que actuará como un elemento de opción: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* Cuando se hace clic en un elemento, actualice el cuadro de selección original,
      y el artículo seleccionado: */
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;

          /* Con este swich dependiendo de la posición del elemento pongo el estilo o lo retiro */
          switch (s.selectedIndex) {
            case 1:
              document.body.classList.remove("dark");

              break;
            case 2:
              document.body.classList.add("dark");

              break;
          }

          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* Cuando se hace clic en el cuadro de selección, cierre cualquier otro cuadro de selección,
    y abra / cierre el cuadro de selección actual: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* Una función que cerrará todos los cuadros de selección en el documento,
  excepto el cuadro de selección actual: */
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* Si el usuario hace clic en cualquier lugar fuera del cuadro de selección,
luego cierre todos los cuadros de selección: */

///CAMBIAR COLOR DEL TEMA

function wow(value) {
  switch (value) {
    case "light":
      document.body.classList.remove("dark");
      alert("light");
      break;
    case "dark":
      document.body.classList.add("dark");
      alert("dark");
      break;
  }
}

//BUSCAR GIFS

const url = "https://api.giphy.com/v1/gifs/search?";
const apiKey = "api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&q=";
const apiKeySlash = "?api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81";
let searchResult = "trending";
let numbersofGifs = "8";

// Sugerencias de busqueda
let buscadorTrendings = document.getElementById("buscador");
let titulosSugeridos = document.getElementById("resultados");
buscadorTrendings.addEventListener("focus", function () {
  document
    .getElementById("sugerencias")
    .setAttribute("style", "margin-top:180px");
  titulosSugeridos.style.display = "block";
});

buscadorTrendings.addEventListener("change", function () {
  document
    .getElementById("sugerencias")
    .setAttribute("style", "margin-top:55px");
  titulosSugeridos.style.display = "none";
});

//crear hashtag
let contenedorBusquedas = document.getElementById("b_recientes_lista");
let numeroBusqueda = 0;
function search() {
  document.getElementById("gifsTendencias").innerHTML = "";
  searchResult = document.getElementById("buscador").value;
  if (searchResult !== "") {
    numeroBusqueda++;
    sessionStorage.setItem("busquedaNo" + numeroBusqueda, searchResult);
  }
  contenedorBusquedas.innerHTML = "";
  for (let i = 1; i <= numeroBusqueda; i++) {
    let busqueda = sessionStorage.getItem("busquedaNo" + i);
    let boton = document.createElement("li");
    boton.innerHTML = busqueda;
    boton.className = "botBusqueda";
    contenedorBusquedas.appendChild(boton);
    boton.onclick = () => {
      buscador.value = boton.innerText;
      search();
    };

    document
      .getElementById("gifsAutomaticos")
      .setAttribute("style", "display:block");
    document.getElementById("misGifs").setAttribute("style", "margin-top:20px");
  }

  let textTendencias = document.getElementById("tendencias");
  textTendencias.innerHTML = searchResult;

  const getUrls = async () => {
    const response = await fetch(
      url +
        apiKey +
        searchResult +
        "&limit=" +
        numbersofGifs +
        "&offset=0&rating=G&lang=es",
      {
        method: "get",
      }
    );
    const json = await response.json();

    return json.data.map((data) => data.images.fixed_width.url);
  };

  getUrls().then((urls) => {
    var elmnt = document.getElementById("hola");
    elmnt.scrollIntoView();
    console.log(elmnt);
    urls.forEach((url) => {
      let divContenedor = document.createElement("div");
      let imgContenedor = document.createElement("img");
      divContenedor.classList.add("cuadroGif");
      imgContenedor.setAttribute("src", url);
      imgContenedor.setAttribute("width", "auto");

      divContenedor.appendChild(imgContenedor);
      document.getElementById("gifsTendencias").appendChild(divContenedor);
    });
  });
}

/// key press buscador
document.getElementById("buscador").onkeypress = function (e) {
  if (e.keyCode == 13) {
    search();
  }
};

const url2 =
  "https://api.giphy.com/v1/gifs/trending?api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&limit=";
let numbersofGifs2 = "8";

//LLAMAR TRENDINGS
function trending() {
  document.getElementById("gifsTendencias").innerHTML = "";

  const getUrls2 = async () => {
    const response2 = await fetch(url2 + numbersofGifs2 + "&rating=G", {
      method: "get",
    });

    const json2 = await response2.json();
    return json2.data.map((data) => data.images.fixed_width.url);
  };

  getUrls2().then((urls) => {
    urls.forEach((url2) => {
      let divContenedor = document.createElement("div");
      let imgContenedor = document.createElement("img");
      divContenedor.classList.add("cuadroGif");
      imgContenedor.setAttribute("src", url2);
      imgContenedor.setAttribute("width", "auto");
      divContenedor.appendChild(imgContenedor);
      document.getElementById("gifsTendencias").appendChild(divContenedor);
    });
  });
  // LLAMAR TOPICOS PRINCIPALES CON HASHTAGS
  const getUrls3 = async () => {
    const response3 = await fetch(
      "https://api.giphy.com/v1/gifs/trending?api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&offset=8&limit=4&rating=G",
      {
        method: "get",
      }
    );

    const json3 = await response3.json();
    //el parametro index me dice el nimero de interaciones que realiza el MAP
    return json3.data.map(function (data, index) {
      let x = document.getElementsByClassName("imgtrend");
      x[index].setAttribute("src", data.images.fixed_width.url);
      let y = document.getElementsByClassName("tituloTrending");
      //crear hashtag
      let titular = data.title;
      let hashtag = "#" + titular.replace(/ .*/, "");
      //crear Url del ver más
      let mas = document.getElementsByClassName("masLink");
      mas[index].setAttribute(
        "href",
        "https://giphy.com/search/" + titular.replace(/ .*/, "")
      );
      y[index].innerHTML = hashtag;
      let topic = document.getElementsByClassName("tendencia");
      topic[index].innerHTML = titular.replace(/ .*/, "");
      return null;
    });
  };
  getUrls3().then(function () {});
}

trending();

// Tendencias Recomendadas al click
let tendencia1 = document.getElementById("tendencia1");
let tendencia2 = document.getElementById("tendencia2");
let tendencia3 = document.getElementById("tendencia3");

tendencia1.addEventListener("click", function () {
  buscador.value = tendencia1.textContent;
  titulosSugeridos.style.display = "none";
  document
    .getElementById("sugerencias")
    .setAttribute("style", "margin-top:55px");
  search();
});

tendencia2.addEventListener("click", function () {
  buscador.value = tendencia2.textContent;
  titulosSugeridos.style.display = "none";
  document
    .getElementById("sugerencias")
    .setAttribute("style", "margin-top:55px");
  search();
});

tendencia3.addEventListener("click", function () {
  buscador.value = tendencia3.textContent;
  titulosSugeridos.style.display = "none";
  document
    .getElementById("sugerencias")
    .setAttribute("style", "margin-top:55px");
  search();
});

let misgifos = document.getElementById("migifos");
misgifos.addEventListener("click", function () {
  document
    .getElementById("gifsAutomaticos")
    .setAttribute("style", "display:none");
  document.getElementById("misGifs").setAttribute("style", "margin-top:70px");
});

function guifos() {
  if (localStorage.length != 0) {
    for (let i = 0; i <= localStorage.length; i++) {
      let clave = localStorage.key(i);
      let idGif = localStorage.getItem(clave).slice(1, -1);
      let creadoGif = fetch(
        "https://api.giphy.com/v1/gifs/" + idGif + apiKeySlash
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let objeto = data.data.images.fixed_height.url;
          let divContenedor = document.createElement("div");
          let imagen = document.createElement("img");
          imagen.src = objeto;

          let divGuifos = document.querySelector("#imagenesGuifos");

          divGuifos.appendChild(imagen);

          divGuifos.classList.add("cuadroGif3");

          imagen.setAttribute("width", "auto");
        })
        .catch((error) => {
          return error;
        });
    }
  }
}

guifos();
