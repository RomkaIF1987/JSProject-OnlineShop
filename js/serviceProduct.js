class ServiceProduct {
    constructor(containerProducts, productsCatalog) {
        this.container = document.querySelector(containerProducts);
        this.productsCatalog = productsCatalog;
        this.create();
    }

    create() {
        let wrapper = document.createElement('slot');

        for (let i = 0; i < this.productsCatalog.length; i++) {
            let item = this.getElement({tagName: 'div', className: 'item'});
            let name = this.getElement({tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name});
            let image = this.getElement({
                tagName: 'div',
                className: 'image',
                backgroundImage: `url(${this.productsCatalog[i].img})`
            });
            let price = this.getElement({tagName: 'div', className: 'name', innerText: this.productsCatalog[i].price});
            let button = this.getElement({tagName: 'button', className: 'btn', innerText: 'Add to Cart'});

            item.appendChild(name);
            item.appendChild(image);
            item.appendChild(price);
            item.appendChild(button);

            wrapper.appendChild(item);
        }
        this.container.appendChild(wrapper);
    }

    getElement(options) {
        let element = document.createElement(options.tagName);
        if ('className' in options) {
            element.setAttribute('class', options.className)
        }
        if ('innerText' in options) {
            element.innerText = options.innerText
        }
        if ('backgroundImage' in options) {
            element.style.backgroundImage = options.backgroundImage
        }
        return element;
    }

    action() {

    }
}

let serviceProduct = new ServiceProduct('.container-products', productsCatalog);