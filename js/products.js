document.addEventListener("DOMContentLoaded", function () {
    const catID = localStorage.getItem("catID");
    const URL_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";
    let productsCar = document.getElementById("containerItems");
    let nameCat = "";

    //Array que contiene elementos obtenidos de api (fetch)
    //let productsArray = [];


    fetch(URL_PRODUCTS)
        .then(res => res.json())
        .then(data => {
            originalData = data.products;
            nameCat = data.name;
            namesCategory(data);
            showCategory(originalData);

        });

        //modo dark del nav
        let nav = document.getElementById("navIndex")
        let mode = localStorage.getItem('mode')
        if(mode === 'dark'){
            nav.removeAttribute('style')    
            nav.classList.add('bg-body-tertiary')
            nav.setAttribute('data-bs-theme', 'dark')
            
        }
        if(mode === 'light'  || !mode){
            nav.removeAttribute('data-bs-theme')
            nav.classList.remove('bg-body-tertiary')
            nav.setAttribute('style','background-color: rgba(255, 192, 74, 0.684);')
        }
        if(nav.hasAttribute('data-bs-theme')){
            botonCambiar.classList.add('active')
        }
});

  let originalData = [];

    function namesCategory(items) {
        let names = document.getElementById("categoryName")
        let htmlContentToAppend = ` <h1>${items.catName}</h1>
    <p class="lead">Verás aquí lo que estas buscando.</p> `
        names.innerHTML = htmlContentToAppend
    }

    function showCategory(itemsArray) {
        this.productsArray = itemsArray;
        let htmlContentToAppend = "";
        for (let i = 0; i < itemsArray.length; i++) {
            htmlContentToAppend += `
                <div onclick="setProductId(${itemsArray[i].id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${itemsArray[i].image}" alt="${itemsArray[i].description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${itemsArray[i].name} - ${itemsArray[i].currency}  ${itemsArray[i].cost}</h4>
                                <small class="text-muted">${itemsArray[i].soldCount} artículos</small>
                            </div>
                            <p class="mb-1">${itemsArray[i].description}</p>
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("containerItemsProducts").innerHTML = htmlContentToAppend;
    }
    let botonFiltrarRango = document.getElementById("rangeFilterCount");
    botonFiltrarRango.addEventListener("click", function () {
        const minPrice = document.getElementById("rangeFilterCountMin").value;
        const maxPrice = document.getElementById("rangeFilterCountMax").value;
        let filtrarPrecio = originalData.filter(product => {
            if (minPrice !== undefined && maxPrice !== undefined) {
                return product.cost >= minPrice && product.cost <= maxPrice;
            } else if (minPrice !== undefined) {
                return product.cost >= minPrice;
            } else if (maxPrice !== undefined) {
                return product.cost <= maxPrice;
            }
            return true;
        });
        filtrarPrecio.sort((a, b) => a.cost - b.cost);
        showCategory(filtrarPrecio);

    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;
        showCategory(originalData);
    });

    const searchInput = document.getElementById("productSearch");

   
    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.toLowerCase().trim();

        let filteredProducts = originalData.filter(product => {
            const productName = product.name.toLowerCase();
            const productDescription = product.description.toLowerCase();
            return productName.includes(searchText) || productDescription.includes(searchText);
        });

        showCategory(filteredProducts);

    });

    let btnDesc = document.getElementById("sortByCount1");
    let btnAsc = document.getElementById("sortByCount2");
    let relevant = document.getElementById("sortByRel");

    btnDesc.addEventListener('click', function () {
        let itemsArray = originalData.slice();

        itemsArray.sort(function (a, b) {
            return b.cost - a.cost;
        });

        showCategory(itemsArray);
    });

    btnAsc.addEventListener('click', function () {
        let itemsArray = originalData.slice();

        itemsArray.sort(function (a, b) {
            return a.cost - b.cost;
        });

        showCategory(itemsArray);
    });

    relevant.addEventListener('click', function () {
        let itemsArray = originalData.slice();

        itemsArray.sort(function (a, b) {
            return b.soldCount - a.soldCount;
        });

        showCategory(itemsArray);
    });

function setProductId(id) {
    localStorage.setItem("IdProduct", id);
    window.location = "product-info.html";
}

