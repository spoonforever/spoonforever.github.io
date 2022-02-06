'use-strict';

class ProductHelper {
    static getPrice(product) {
        return product.count * (product.isPromotion ?
            product.pricing.promotionPrice :
            product.pricing.retailPrice);
    }

    static mergeImagesArrayWithMainImage(product) {
        if (product.images) {
            if (!product.images.includes(product.image.src)) {
                product.images.unshift(product.image.src);
            }
        } else {
            product.images = [product.image.src];
        }
    }

    static productPageUrl = '/product.html?id=';
}