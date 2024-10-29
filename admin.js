document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.getElementById('addButton');
    let productInputName = document.getElementById('productInputName');
    let productInputDescription = document.getElementById('productInputDescription');
    let productInputPrice = document.getElementById('productInputPrice');
    let productInputImage = document.getElementById('productInputImage');
    let saveButton = document.getElementById('saveButton');
    let productsContainer = document.getElementById('productsContainer'); 

    
    addButton.addEventListener('click', function() {
        resetForm();  
        document.getElementById('productIndex').value = '';  
        addButton.style.display = 'none';  
        toggleFormVisibility(true); 
    });

    saveButton.addEventListener('click', function() {
        addOrUpdateProduct();
        renderProducts(); 
        toggleFormVisibility(false); 
        addButton.style.display = 'block'; 
    });

    
    renderProducts();
});


function toggleFormVisibility(visible) {
    const display = visible ? 'block' : 'none';
    document.getElementById('productInputName').style.display = display;
    document.getElementById('productInputDescription').style.display = display;
    document.getElementById('productInputPrice').style.display = display;
    document.getElementById('productInputImage').style.display = display;
    document.getElementById('saveButton').style.display = display;
}


function addOrUpdateProduct() {
    let productInputNameValue = document.getElementById('productInputName').value.trim();
    let productInputDescriptionValue = document.getElementById('productInputDescription').value.trim();
    let productInputPriceValue = document.getElementById('productInputPrice').value.trim();
    let productInputImageValue = document.getElementById('productInputImage').value.trim();

    if (productInputNameValue && productInputDescriptionValue && productInputPriceValue && productInputImageValue) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let productIndexElement = document.getElementById('productIndex');
        let productIndex = productIndexElement ? parseInt(productIndexElement.value) : -1;

        
        if (!isNaN(productIndex) && productIndex >= 0 && productIndex < products.length) {
            products[productIndex] = {
                name: productInputNameValue,
                description: productInputDescriptionValue,
                price: productInputPriceValue,
                image: productInputImageValue
            };
        } else {
            
            products.push({
                name: productInputNameValue,
                description: productInputDescriptionValue,
                price: productInputPriceValue,
                image: productInputImageValue
            });
        }

        localStorage.setItem('products', JSON.stringify(products));

        
        resetForm();
        document.getElementById('productIndex').value = '';
    } else {
        alert('Por favor, llena todos los campos');
    }
}


function renderProducts() {
    let productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';
    let products = JSON.parse(localStorage.getItem('products')) || [];

    products.forEach((product, index) => {
        let productCard = document.createElement('div');
        productCard.classList.add('product-card'); 

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Eliminar</button>
        `;

        productsContainer.appendChild(productCard);
    });
}


function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    let product = products[index];

    document.getElementById('productInputName').value = product.name;
    document.getElementById('productInputDescription').value = product.description;
    document.getElementById('productInputPrice').value = product.price;
    document.getElementById('productInputImage').value = product.image;

    
    document.getElementById('productIndex').value = index;

    
    toggleFormVisibility(true);
    addButton.style.display = 'none';
}


function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products'));
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts(); 
}


function resetForm() {
    document.getElementById('productInputName').value = '';
    document.getElementById('productInputDescription').value = '';
    document.getElementById('productInputPrice').value = '';
    document.getElementById('productInputImage').value = '';
}