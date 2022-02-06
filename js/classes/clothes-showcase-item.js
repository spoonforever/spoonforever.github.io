'use strict';

class ClothesShowcaseItem {
    constructor(objectClothesItem) {
        this.objectClothesItem = objectClothesItem;
        this.emptyDiv = document.createElement('div');
    }

    createItemContainer() {
        const container = document.createElement('article');
        container.classList.add('clothes-item');

        return container;
    }

    createImageContainer() {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('clothes-item-image-container');

        const image = document.createElement('img');
        image.classList.add('clothes-item-image');
        image.setAttribute('src', this.objectClothesItem.image.src);
        image.setAttribute('alt', this.objectClothesItem.image.alt);

        const productLink = document.createElement('a');
        productLink.setAttribute('href', `${ProductHelper.productPageUrl}${this.objectClothesItem.id}`);
        productLink.setAttribute('target', '_blank');
        
        productLink.appendChild(image);

        imageContainer.appendChild(productLink);

        return imageContainer;
    }

    createTitleContainer() {
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('clothes-item-title-container');

        const title = document.createElement('h1');
        title.classList.add('clothes-item-title');
        title.innerText = this.objectClothesItem.title.text;

        titleContainer.appendChild(title);

        return titleContainer;
    }

    createPriceContainer() {
        const priceInfoContainer = document.createElement('div');
        priceInfoContainer.classList.add('clothes-item-price-info-container');

        const priceHeader = this.emptyDiv.cloneNode();
        priceHeader.classList.add('clothes-item-price-header');

        priceInfoContainer.appendChild(this.emptyDiv.cloneNode());
        priceInfoContainer.appendChild(priceHeader);
        priceInfoContainer.appendChild(this.emptyDiv.cloneNode());

        const priceContainer = this.emptyDiv.cloneNode();

        const retailPrice = this.emptyDiv.cloneNode();
        retailPrice.innerText = `${this.objectClothesItem.pricing.retailPrice} грн`;

        if (this.objectClothesItem.isPromotion) {
            priceHeader.classList.add('clothes-item-promotion-price-header');
            priceHeader.innerText = 'Скидка 🔥';

            const promotionPrice = this.emptyDiv.cloneNode();
            promotionPrice.classList.add('clothes-item-promotional-price');
            promotionPrice.innerText = `${this.objectClothesItem.pricing.promotionPrice} грн`;

            priceContainer.appendChild(promotionPrice);

            retailPrice.classList.add('clothes-item-crossed-retail-price');
        } else {
            priceHeader.innerText = 'Цена';
        }

        priceContainer.appendChild(retailPrice);

        priceInfoContainer.appendChild(priceContainer);
        priceInfoContainer.appendChild(this.emptyDiv.cloneNode());

        return priceInfoContainer;
    }

    createSizesContainer() {
        const sizesContainer = this.emptyDiv.cloneNode();
        sizesContainer.classList.add('clothes-item-sizes-container');

        const width = this.emptyDiv.cloneNode();
        width.innerText = this.objectClothesItem.sizes.width;

        const leftCross = this.emptyDiv.cloneNode();
        leftCross.innerHTML = '&#10006;';

        const length = this.emptyDiv.cloneNode();
        length.innerText = this.objectClothesItem.sizes.length;

        const rightCross = this.emptyDiv.cloneNode();
        rightCross.innerHTML = '&#10006;';

        const height = this.emptyDiv.cloneNode();
        height.innerText = this.objectClothesItem.sizes.heigth;

        sizesContainer.appendChild(this.emptyDiv.cloneNode());
        sizesContainer.appendChild(width);
        sizesContainer.appendChild(leftCross);
        sizesContainer.appendChild(length);
        sizesContainer.appendChild(rightCross);
        sizesContainer.appendChild(height);
        sizesContainer.appendChild(this.emptyDiv.cloneNode());

        return sizesContainer;
    }

    createButtonContainer() {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('clothes-item-button-container');

        const button = document.createElement('button');
        button.classList.add('clothes-item-button');
        button.setAttribute("data-clothes-item-id", this.objectClothesItem.id);
        button.innerText = 'Добавить в корзину';

        buttonContainer.appendChild(button);

        return buttonContainer;
    }
}