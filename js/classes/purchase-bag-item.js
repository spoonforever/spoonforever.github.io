'use strict';

class PurchaseBagItem {
    constructor(objectPurchaseItem) {
        this.objectPurchaseItem = objectPurchaseItem;
        this.emptyDiv = document.createElement('div');
    }

    createItemContainer() {
        const container = document.createElement('article');
        container.classList.add('purchase-list-item');

        return container;
    }

    createLeftEdgeContainer() {
        return this.emptyDiv.cloneNode();
    }

    createDeletingCrossContainer() {
        const deletingCrossTopContainer = this.emptyDiv.cloneNode();
        const deletingCrossContainer = this.emptyDiv.cloneNode();

        const deletingButton = document.createElement('button');
        deletingButton.classList.add('purchase-item-deleting-cross');
        deletingButton.setAttribute('data-purchase-bag-item-id', this.objectPurchaseItem.id);
        deletingButton.innerHTML = '&#10006;';

        deletingCrossContainer.appendChild(deletingButton);
        deletingCrossTopContainer.appendChild(deletingCrossContainer);

        return deletingCrossTopContainer;
    }

    createItemInfoContainer() {
        const itemInfoContainer = this.emptyDiv.cloneNode();
        itemInfoContainer.classList.add('purchase-item-info-container');

        const itemPhotoContainer = this.emptyDiv.cloneNode();
        itemPhotoContainer.classList.add('purchase-item-image-container');

        const itemPhoto = document.createElement('img');
        itemPhoto.classList.add('purchase-list-item-image');
        itemPhoto.setAttribute('src', this.objectPurchaseItem.image.src);
        itemPhoto.setAttribute('alt', this.objectPurchaseItem.image.alt);

        const purchaseBagItem = this.objectPurchaseItem;

        itemPhoto.addEventListener('click', () => {
            const newUrl = `${ProductHelper.productPageUrl}${purchaseBagItem.id}`;

            location.replace(newUrl);
        });

        itemPhotoContainer.appendChild(itemPhoto);

        const itemNameContainer = this.emptyDiv.cloneNode();
        itemNameContainer.classList.add('purchase-item-name-container');
        itemNameContainer.innerText = this.objectPurchaseItem.title.text;

        itemInfoContainer.appendChild(itemPhotoContainer);
        itemInfoContainer.appendChild(itemNameContainer);

        return itemInfoContainer;
    }

    createItemQuantityContainer() {
        const itemQuantityTopContainer = this.emptyDiv.cloneNode();
        const itemQuantityContainer = this.emptyDiv.cloneNode();

        const itemQuantity = this.emptyDiv.cloneNode();
        itemQuantity.classList.add('purchase-item-quantity');
        itemQuantity.innerText = this.objectPurchaseItem.count;

        const buttonArrowUp = document.createElement('button');
        buttonArrowUp.classList.add('purchase-item-quantity-arrow');
        buttonArrowUp.setAttribute('data-purchase-bag-item-id', this.objectPurchaseItem.id);
        buttonArrowUp.innerHTML = '&#8963';

        const buttonArrowDown = buttonArrowUp.cloneNode();
        buttonArrowDown.classList.add('quantity-arrow-down');
        buttonArrowDown.innerHTML = '&#8963';

        buttonArrowUp.classList.add('quantity-arrow-up');

        itemQuantityContainer.appendChild(buttonArrowUp);
        itemQuantityContainer.appendChild(itemQuantity);
        itemQuantityContainer.appendChild(buttonArrowDown);

        itemQuantityTopContainer.appendChild(itemQuantityContainer);

        return itemQuantityTopContainer;
    }

    createItemPriceContainer() {
        const itemPriceTopContainer = this.emptyDiv.cloneNode();

        const itemPriceContainer = this.emptyDiv.cloneNode();
        itemPriceContainer.innerText = ProductHelper.getPrice(this.objectPurchaseItem);

        itemPriceTopContainer.appendChild(itemPriceContainer);

        return itemPriceTopContainer;
    }

    createRightEdgeContainer() {
        return this.emptyDiv.cloneNode();
    }
}