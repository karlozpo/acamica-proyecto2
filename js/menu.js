var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
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
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
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

/* If the user clicks anywhere outside the select box,
then close all select boxes: */





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

const url = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&q=';
let searchResult = 'trending';
let numbersofGifs = "8";

// Sugerencias de busqueda
let buscadorTrendings= document.getElementById("buscador");
let titulosSugeridos= document.getElementById("resultados");
buscadorTrendings.addEventListener("focus",function () {
document.getElementById("sugerencias").setAttribute("style","margin-top:120px");
titulosSugeridos.style.display="block";
})
buscadorTrendings.addEventListener("focusout",function () {
  document.getElementById("sugerencias").setAttribute("style","margin-top:15px");
  titulosSugeridos.style.display="none";
  })


//crear hashtag


function search() {
  document.getElementById("gifsTendencias").innerHTML = "";

  
   searchResult = document.getElementById("buscador").value;
   let textTendencias= document.getElementById("tendencias");
   textTendencias.innerHTML=searchResult;
  

  const getUrls = async () => {
    const response = await fetch(url + apiKey + searchResult + "&limit=" + numbersofGifs + "&offset=0&rating=G&lang=es", {
      method: 'get'
    });
    const json = await response.json();
    
    return json.data.map(data => data.images.fixed_width.url);
  }

  getUrls().then(urls => {
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
document.getElementById('buscador').onkeypress = function (e) {
  if (e.keyCode == 13) {
    search();
  }
}

const url2= "https://api.giphy.com/v1/gifs/trending?api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&limit=";
let numbersofGifs2 = "8";

//LLAMAR TRENDINGS
function trending() {
  document.getElementById("gifsTendencias").innerHTML = "";

  const getUrls2 = async () => {
    const response2 = await fetch(url2 + numbersofGifs2 + "&rating=G", {
      method: 'get'
    });

    const json2 = await response2.json();
    return json2.data.map(data => data.images.fixed_width.url);
  }

  getUrls2().then(urls => {

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
    const response3 = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=HfFHI1IWTIBPUa7JgXcE0M67VgBCex81&offset=8&limit=4&rating=G", {
      method: 'get'
    });
    
    const json3 = await response3.json();
   //el parametro index me dice el nimero de interaciones que realiza el MAP
    return json3.data.map(function (data,index) {
      
      let x=document.getElementsByClassName("imgtrend");
      x[index].setAttribute("src",data.images.fixed_width.url);
      let y=document.getElementsByClassName("tituloTrending");
      //crear hashtag
      let titular=data.title;
      let hashtag="#"+titular.replace(/ .*/,'');
       //crear Url del ver más
      let mas=document.getElementsByClassName("masLink");
      mas[index].setAttribute("href","https://giphy.com/search/"+titular.replace(/ .*/,''));
      y[index].innerHTML=hashtag;
      
      let topic=document.getElementsByClassName("tendencia");
      topic[index].innerHTML=titular.replace(/ .*/,'');
      
    
     
      
      return null;
    })
    
  }
  getUrls3().then(function () {

  });

}

trending();

// Tendencias Recomendadas al click
let tendencia1= document.getElementById("tendencia1");
let tendencia2= document.getElementById("tendencia2");
let tendencia3= document.getElementById("tendencia3");

tendencia1.addEventListener("click",function () {
  console.log("hello");
})
