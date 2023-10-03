const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
      });
}

const botonCambiar = document.getElementById("cambiarModo"); //const del boton del nav

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("autos").addEventListener("click", function() {
      localStorage.setItem("catID", 101);
      window.location = "products.html"
  });
  document.getElementById("juguetes").addEventListener("click", function() {
      localStorage.setItem("catID", 102);
      window.location = "products.html"
  });
  document.getElementById("muebles").addEventListener("click", function() {
      localStorage.setItem("catID", 103);
      window.location = "products.html"
  });

});

if ((typeof sessionStorage !== 'undefined') || (typeof localStorage !== 'undefined')) {
  // Comprobar si existe un elemento en sessionStorage o localStorage
  if (sessionStorage.getItem('username') || localStorage.getItem('username')) {
    console.log('La sesión existe.');
  } else {
    Swal.fire({
      title:'Si desea continuar, inicie sesión.',
      icon: 'success'
    }).then(() => { window.location.href = "login.html";
  })
  }
} else {
  console.log('El navegador no admite sessionStorage ni localStorage.');
}

document.getElementById("logueduser").innerHTML = localStorage.getItem("username") || sessionStorage.getItem("username");

 //boton del nav 
 botonCambiar.addEventListener("click", function (){ 
  botonCambiar.classList.toggle('active');
  let nav = document.getElementById("navIndex")
  let check = nav.toggleAttribute('data-bs-theme')

  if(check){
      localStorage.setItem('mode', 'dark')
  }else{
      localStorage.setItem('mode', 'light')
  }
  let mode = localStorage.getItem('mode')
  if(mode === 'dark'){
      nav.removeAttribute('style')    
      nav.classList.add('bg-body-tertiary')
      nav.setAttribute('data-bs-theme', 'dark')
      
  }
  if(mode === 'light'){
      nav.removeAttribute('data-bs-theme')
      nav.classList.remove('bg-body-tertiary')
      nav.setAttribute('style','background-color: rgba(255, 192, 74, 0.684);')
  }
  
})
