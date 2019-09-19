class ServiceProduct {
    constructor(containerProducts, productsCatalog, containerCounter) {
        this.container = document.querySelector(containerProducts);
        this.counter = document.querySelector(containerCounter);
        this.productsCatalog = productsCatalog;
        this.create();
    }

    create() {
        let wrapper = document.createElement('slot');
        let products = serviceStore.getProduct();
        this.counter.innerText = products.length;

        for (let i = 0; i < this.productsCatalog.length; i++) {
            let index = products.indexOf(this.productsCatalog[i].id);
            let activeClass;
            let activeText;
            if (index === -1) {
                activeClass = '';
                activeText = 'Add to Cart';
            } else {
                activeClass = ' btn-active';
                activeText = 'Delete';
            }

            let item = this.getElement({tagName: 'div', className: 'item'});
            let name = this.getElement({tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name});
            let image = this.getElement({
                tagName: 'div',
                className: 'image',
                backgroundImage: `url(${this.productsCatalog[i].img})`
            });
            let price = this.getElement({tagName: 'div', className: 'name', innerText: this.productsCatalog[i].price});
            let button = this.getElement({
                tagName: 'button',
                className: 'btn' + activeClass,
                innerText: activeText,
                id: this.productsCatalog[i].id
            });

            button.addEventListener('click', function () {
                let id = this.getAttribute('data-id');
                let result = serviceStore.putProduct(id);
                serviceProduct.counter.innerText = result.products.length;
                if (result.pushProduct) {
                    this.classList.add('btn-active');
                    this.innerText = 'Delete';
                } else {
                    this.classList.remove('btn-active');
                    this.innerText = 'Add to Cart';
                }
            });

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
            element.setAttribute('class', options.className);
        }
        if ('innerText' in options) {
            element.innerText = options.innerText;
        }
        if ('backgroundImage' in options) {
            element.style.backgroundImage = options.backgroundImage;
        }
        if ('id' in options) {
            element.setAttribute('data-id', options.id);
        }
        return element;
    }

    action() {

    }
}

let serviceProduct = new ServiceProduct('.container-products', productsCatalog, '.container-counter');