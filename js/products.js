const URL_PRODUCTS_CAR = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let productsCar = document.getElementById("containerAuto");

function showCategoryCar(car) {
    let carArray = car.products
    let htmlContentToAppend = "";
    for (let i = 0; i < carArray.length; i++) {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${carArray[i].image}" alt="${carArray[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${carArray[i].name} - ${carArray[i].currency}  ${carArray[i].cost}</h4>
                            <small class="text-muted">${carArray[i].soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${carArray[i].description}</p>
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("containerAuto").innerHTML = htmlContentToAppend;
}

fetch(URL_PRODUCTS_CAR)
    .then(res => res.json())
    .then(data => showCategoryCar(data))