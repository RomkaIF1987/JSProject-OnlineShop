class ServiceStore {

    constructor() {

    }

    getProduct() {
        let products = [];
        let productsLocalStorage = localStorage.getItem('products');
        if (productsLocalStorage !== null) {
            products = JSON.parse(productsLocalStorage);
        }
        return products;
    }

    putProduct(id) {
        let pushProduct;
        let products = this.getProduct();
        let index = products.indexOf(id);
        if (index === -1) {
            products.push(id);
            pushProduct = true;
        } else {
            products.splice(index, 1);
            pushProduct = false;
        }
        localStorage.setItem('products', JSON.stringify(products));

        return {
            pushProduct: pushProduct,
            products: products
        }
    }
}

let serviceStore = new ServiceStore();