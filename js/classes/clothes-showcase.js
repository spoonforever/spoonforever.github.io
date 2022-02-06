'use strict';

class ClothesShowcase {
    constructor(itemsCollection) {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const filters = urlParams.get('filters');
        if (filters) {
            const filtersArray = filters.split('$');
            this.itemsCollection = itemsCollection.filter(x => filtersArray.every(y => x.tags.includes(y)));
        } else {
            this.itemsCollection = itemsCollection;
        }

        this.topSellsContainer = document.querySelector('.top-sells-item-container');
        this.clothesContainer = document.querySelector('.clothes-item-container');
    }

    fillTopSellsContainer() {
        this.topSellsContainer.innerHTML = '';

        const topSellsSliderContainer = document.createElement('div');
        topSellsSliderContainer.classList.add('top-sells-item-slider-container');

        this.itemsCollection
            .filter(x => x.isTopSell)
            .forEach(element => {
                const htmlItem = this.createClothesHtmlItem(element);

                topSellsSliderContainer.appendChild(htmlItem);
            });

        this.topSellsContainer.appendChild(topSellsSliderContainer);
    }

    fillClothesContainer() {
        this.clothesContainer.innerHTML = '';
        this.itemsCollection
            .forEach(element => {
                const htmlItem = this.createClothesHtmlItem(element);

                this.clothesContainer.appendChild(htmlItem);
            });
    }

    createClothesHtmlItem(objectClothesItem) {
        const clothesShowcaseItem = new ClothesShowcaseItem(objectClothesItem);

        const container = clothesShowcaseItem.createItemContainer();
        const imageContainer = clothesShowcaseItem.createImageContainer();
        const titleContainer = clothesShowcaseItem.createTitleContainer();
        const priceContainer = clothesShowcaseItem.createPriceContainer();
        const sizesContainer = clothesShowcaseItem.createSizesContainer();
        const buttonContainer = clothesShowcaseItem.createButtonContainer();

        container.appendChild(imageContainer);
        container.appendChild(titleContainer);
        container.appendChild(priceContainer);
        container.appendChild(sizesContainer);
        container.appendChild(buttonContainer);

        return container;
    }
}