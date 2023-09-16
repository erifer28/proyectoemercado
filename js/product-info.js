document.addEventListener('DOMContentLoaded', () => {
    let idProduct = localStorage.getItem("IdProduct");
    let URL_ID_PRODUCTS = "https://japceibal.github.io/emercado-api/products/" + idProduct + ".json";
    const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"  + idProduct + ".json";
    fetch(URL_ID_PRODUCTS)
        .then(res => res.json())
        .then(data => showProduct(data));
    
    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(res => res.json())
        .then(data => showComments(data));

        
});
function showProduct(product) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
    <main class="pb-5">
        <div class="text-center p-4">
            <h2>${product.name}</h2><br><br><hr>
        </div>
            <div class="row">
                <h4>Precio</h4> 
                    <p class="mb-1">${product.currency}  ${product.cost}</p><br><br>
                <h4>Descripción</h4> 
                    <p class="mb-1">${product.description}</p><br><br>
                <h4>Categoría</h4> 
                    <p class="mb-1">${product.category}</p><br><br>
                <h4>Cantidad de vendidos</h4> 
                    <p class="mb-1">${product.soldCount}</p><br><br>
                <h4>Imágenes ilustrativas</h4> 
        `;
    product.images.forEach(imagen => {
        htmlContentToAppend += `
            <div class="col">
                    <img src="${imagen}" class="img-thumbnail">
            </div>
            `;
    });
    htmlContentToAppend += `
                </div>
            </main>
        `;
    document.getElementById("containerItemsInfoProduct").innerHTML = htmlContentToAppend;
};

function showComments(itemsArray) {
    let divComent = document.getElementById("containerItemsInfo")
    const iconEstrella = '<i class="fas fa-star" style="color: #ffc800;"></i>';
    const icoNoEstrella = '<i class="far fa-star" style="color: #ffc800;"></i>';
    const total = 5;
    let htmlContentToAppend = "";
    for (let i = 0; i < itemsArray.length; i++) {
        let estrellas = "";
        for (let j = 1; j <= total; j++) {
          if (j <= itemsArray[i].score) {
            estrellas += iconEstrella;
          } else 
            estrellas += icoNoEstrella;
          }
        
        htmlContentToAppend += `
        <div>
            <div>
            <div id="coment">
                <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">${itemsArray[i].user}&#160 &#160${estrellas}</p>
                    <p class="mb-1">${itemsArray[i].dateTime} </p>
                </div>
                <br>
                <p class="mb-1">${itemsArray[i].description}</p>
            </div> 
        </div>    
        </div>
       
    `
    }

    divComent.innerHTML = htmlContentToAppend;
}

//Desafiate 

let boton = document.getElementById("enviar"); //id del boton

boton.addEventListener("click", function () { //funcion que se utiliza para añadir el comentario 
   let estrellas = "";
   let iconEstrella = '<i class="fas fa-star" style="color: #ffc800;"></i>';
   let icoNoEstrella = '<i class="far fa-star" style="color: #ffc800;"></i>';
   let total = 5;    
   let commentarie1 = document.getElementById("floatingTextarea2");
   let score = document.getElementById("select");
   let nom1 = localStorage.getItem("username");
   let fecha = dates ();
   let htmlContentToAppend = "";
   let data2 = { user: nom1, estrellas: score.value, dateTime: fecha , description: commentarie1.value}
   for (let j = 1; j <= total; j++) {
    if (j <= data2.estrellas) {
      estrellas += iconEstrella;
    } else 
      estrellas += icoNoEstrella;
    }
  
  htmlContentToAppend += `
  <div>
      <div>
      <div id="coment">
          <div class="d-flex w-100 justify-content-between">
          <p class="mb-1">${data2.user}&#160 &#160${estrellas}</p>
              <p class="mb-1">${data2.dateTime} </p>
          </div>
          <br>
          <p class="mb-1">${data2.description}</p>
      </div> 
  </div>    
  </div>
 
` 
document.getElementById("containerItemsInfo").innerHTML += htmlContentToAppend;

//limpiar 
commentarie1.value= "";
score.value="";

});
 
//funcion para la fecha 
function dates(){
    let date= new Date();
    let current_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    let current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let dateTime = current_date + " " + current_time; 
    return dateTime; 
    }



 
