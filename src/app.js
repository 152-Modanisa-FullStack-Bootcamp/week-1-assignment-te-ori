import "./styles.css";
import axios from "axios";

const container = document.getElementById('product-container');

function createElement(name, attributes) {
  const element = document.createElement(name);
  for (const attr of Object.keys(attributes)) {
    switch (attr) {
      case 'class': element.classList.add(attributes[attr]); break;
      default: element[attr] = attributes[attr];
    }
  }

  return element;
}

function createProductBox(product) {
  const imgElement = createElement('img', { src: product.image });
  const nameElement = createElement('div', { class: 'product-name' });
  nameElement.innerText = product.name;

  const element = createElement('div', { class: 'product' });
  element.append(imgElement);
  element.append(nameElement);

  container.append(element);
}


axios
  .get("https://my-json-server.typicode.com/modanisatech/bootcamp-db/products")
  .then((response) => {
    // Firstly, log response to the console,
    // inspect the response and see that it has data field
    console.log(response);

    // Assign data field of the response to
    // products variable below by destructuring
    // You can use alias
    const products = response.data;

    // Print names of all product to the consolea
    // by calling foreach  method (use arrow function)
    products.forEach((product, index) => {
      console.log(index, product);
    });

    // Get all products that contain "Şal" in their name (use filter method)
    // map filtered products to new object having only image and name field
    // assign mapped items to mappedProducts variable
    const mappedProducts = products.filter(product => product.name.includes('Şal'))
      .map(product => ({ name: product.name, image: product.image }));
    console.log('mapped products', mappedProducts);
    
    // Display the images and names of mappedProducts
    // You need to add them to the DOM
    // you need to use forEach method
    // You need to use flexbox
    // Position of image and text is up to you
    // You can use any style you wish
    mappedProducts.forEach(createProductBox);
  });
