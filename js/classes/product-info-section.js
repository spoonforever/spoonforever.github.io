'use strict';

class ProductInfoSection {
    constructor(product) {
        this.product = product;
        this.productInfoTemplate = document.querySelector('#product-info').innerHTML;
        this.productInfoContainer = document.querySelector('.product-info-container');
    }

    static descriptionEmpty = 'Описание не найдено';

    fillProductInfoSection() {
        let htmlItem = this.productInfoTemplate
            .replace('{{promotional-price}}', this.product.pricing.promotionPrice)
            .replace('{{price}}', this.product.pricing.retailPrice)
            .replace('{{title}}', this.product.title.text)
            .replace('{{width}}', this.product.sizes.length)
            .replace('{{length}}', this.product.sizes.length)
            .replace('{{heigth}}', this.product.sizes.heigth)
            .replace('{{id}}', this.product.id)
            .replace('{{description}}', this.product.description ?? ProductInfoSection.descriptionEmpty);

        if (this.product.isPromotion) {
            htmlItem = htmlItem
                .replace('{{hide}}', '')
                .replace('{{crossed-price-class}}', 'clothes-item-crossed-retail-price');
        } else {
            htmlItem = htmlItem
                .replace('{{hide}}', 'hide')
                .replace('{{crossed-price-class}}', '');
        }

        this.productInfoContainer.innerHTML = htmlItem;
    }
}