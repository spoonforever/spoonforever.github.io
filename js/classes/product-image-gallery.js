'use strict';

class ProductImageGallery {
    constructor(product) {
        this.product = product;
        this.imageGalleryContainer = document.querySelector('.product-all-images-container');
        this.imageGalleryItemTemplate = document.querySelector('#image-gallery-item').innerHTML;
    }

    setEvents() {
        document.querySelectorAll('.product-image')
            .forEach(element => {
                element.addEventListener('click', (e) => {
                    const newSelectedImage = e.target;
                    const newSelectedImageContainer = newSelectedImage.closest('.product-image-container');

                    const currentSelectedImage = document.querySelector('.product-mini-selected-image');
                    if (currentSelectedImage) {
                        const currentSelectedImageContainer = currentSelectedImage.closest('.product-image-container');

                        currentSelectedImageContainer.classList.remove('product-mini-selected-image-container');
                        currentSelectedImage.classList.remove('product-mini-selected-image');
                    }

                    newSelectedImageContainer.classList.add('product-mini-selected-image-container');
                    newSelectedImage.classList.add('product-mini-selected-image');

                    const newSelectedImageSrc = newSelectedImage.getAttribute('src');

                    const bigSelectedImage = document.querySelector('.product-selected-image');
                    bigSelectedImage.setAttribute('src', newSelectedImageSrc);
                });
            });
    }

    selectFirstOne() {
        const firstFoundActive = document.querySelector('.slick-active');
        if (firstFoundActive) {
            firstFoundActive.querySelector('.product-image').click();
        }
    }

    fillImageGallery() {
        this.imageGalleryContainer.innerHTML = '';

        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add("product-all-images-slider-container");

        if (this.product.images) {
            this.product.images.forEach(imageSrc => {
                const htmlItem = this.imageGalleryItemTemplate.replace("{{image-src}}", imageSrc);

                sliderContainer.innerHTML += (htmlItem);
            });
        }

        this.imageGalleryContainer.appendChild(sliderContainer);
    }
}