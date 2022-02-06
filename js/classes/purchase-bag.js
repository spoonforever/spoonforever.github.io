'use strict';

class PurchaseBag {
    constructor(itemsCollection) {
        this.PURCHASE_LIST_KEY = 'purchase-list-key-spoon-shop';

        this.itemsCollection = itemsCollection;
        this.purchaseCounterSpan = document.getElementById('purchase-counter');
        this.purchaseListContainer = document.getElementsByClassName('purchase-list-container')[0];
        this.purchaseTotalPriceContainer = document.getElementById('purchase-total-price');

        this.initPurchaseListData();
        this.updatePurchaseData();
    }

    initPurchaseListData() {
        const storedPurchaseList = localStorage.getItem(this.PURCHASE_LIST_KEY);
        if (storedPurchaseList) {
            this.purchaseList = JSON.parse(storedPurchaseList);
        } else {
            this.purchaseList = {};
        }
    }

    fillPurchaseListContainer() {
        const childrenArray = Array.from(this.purchaseListContainer.children);
        childrenArray.forEach(child => {
            if ((child.classList.contains('purchase-list-item') &&
                    !child.classList.contains('purchase-list-column-info') &&
                    !child.classList.contains('purchase-list-total')) ||
                (child.classList.contains('grey-separation-line') &&
                    !child.classList.contains('first-grey-separation-line'))) {
                this.purchaseListContainer.removeChild(child);
            }
        });

        const totalPriceContainer = document.getElementsByClassName('purchase-list-total')[0];

        const purchaseBagItems = this.itemsCollection
            .filter(purchaseItem => purchaseItem.count > 0);

        purchaseBagItems.forEach(purchaseItem => {
            const htmlItem = this.createPurchaseBagHtmlItem(purchaseItem);
            const separator = this.createGreyLineSeparator();

            this.purchaseListContainer.insertBefore(htmlItem, totalPriceContainer);
            this.purchaseListContainer.insertBefore(separator, totalPriceContainer);
        });
    }

    createGreyLineSeparator() {
        const separator = document.createElement('div');
        separator.classList.add('grey-separation-line');

        return separator;
    }

    createPurchaseBagHtmlItem(objectPurchaseItem) {
        const purchaseBagItem = new PurchaseBagItem(objectPurchaseItem);

        const itemContainer = purchaseBagItem.createItemContainer();
        const leftEdgeContainer = purchaseBagItem.createLeftEdgeContainer();
        const deletingCrossContainer = purchaseBagItem.createDeletingCrossContainer();
        const itemInfoContainer = purchaseBagItem.createItemInfoContainer();
        const itemQuantityContainer = purchaseBagItem.createItemQuantityContainer();
        const itemPriceContainer = purchaseBagItem.createItemPriceContainer();
        const rightEdgeContainer = purchaseBagItem.createRightEdgeContainer();

        itemContainer.appendChild(leftEdgeContainer);
        itemContainer.appendChild(deletingCrossContainer);
        itemContainer.appendChild(itemInfoContainer);
        itemContainer.appendChild(itemQuantityContainer);
        itemContainer.appendChild(itemPriceContainer);
        itemContainer.appendChild(rightEdgeContainer);

        return itemContainer;
    }

    setIndexPageEvents() {
        this.setEventsForAddItemButton();
    }

    setProductPageEvents() {
        this.setEventsForAddItemButton();
    }

    setPurchaseBagPageEvents() {
        const purchaseBag = this;
        const deleteFromBagButtons = document.getElementsByClassName('purchase-item-deleting-cross');
        for (const button of deleteFromBagButtons) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();

                const button = e.target;
                const itemId = button.getAttribute('data-purchase-bag-item-id');

                delete purchaseBag.purchaseList[itemId];

                purchaseBag.refreshPurchaseBagList();

                const deletedItem = this.itemsCollection.find(x => x.id == itemId);
                
                Message.showMessage(deletedItem, Message.MESSAGE_TYPES.DELETED_PRODUCT);
            });
        }

        const incrementQuantityButtons = document.getElementsByClassName('quantity-arrow-up');
        for (const button of incrementQuantityButtons) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();

                const button = e.target;
                const itemId = button.getAttribute('data-purchase-bag-item-id');

                if (purchaseBag.purchaseList[itemId] !== undefined &&
                    purchaseBag.purchaseList[itemId] !== null) {
                    purchaseBag.purchaseList[itemId].count++;

                    const item = this.itemsCollection.find(x => x.id == itemId);

                    Message.showMessage(item, Message.MESSAGE_TYPES.COUNT_INCREMENT);
                }

                purchaseBag.refreshPurchaseBagList();
            });
        }

        const decrementQuantityButtons = document.getElementsByClassName('quantity-arrow-down');
        for (const button of decrementQuantityButtons) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();

                const button = e.target;
                const itemId = button.getAttribute('data-purchase-bag-item-id');

                if (purchaseBag.purchaseList[itemId] !== undefined &&
                    purchaseBag.purchaseList[itemId] !== null) {
                    purchaseBag.purchaseList[itemId].count--;

                    const item = this.itemsCollection.find(x => x.id == itemId);
                    
                    if(purchaseBag.purchaseList[itemId].count > 0) {
                        Message.showMessage(item, Message.MESSAGE_TYPES.COUNT_DECREMENT);
                    } else {
                        Message.showMessage(item, Message.MESSAGE_TYPES.DELETED_PRODUCT);
                    }
                }

                purchaseBag.refreshPurchaseBagList();
            });
        }
    }

    refreshPurchaseBagList() {
        this.updatePurchaseData();
        this.fillPurchaseListContainer();
        this.setPurchaseBagPageEvents();
    }

    updatePurchaseData() {
        this.itemsCollection.forEach(purchaseItem => {
            purchaseItem.count = 0;
        });

        let sum = 0;
        let totalPrice = 0;
        for (const purchaseItemId in this.purchaseList) {
            if (this.purchaseList[purchaseItemId].count > 0) {
                const purchaseItem = this.itemsCollection.find(x => x.id === purchaseItemId);
                purchaseItem.count = this.purchaseList[purchaseItemId].count;

                sum += this.purchaseList[purchaseItemId].count;
                totalPrice += ProductHelper.getPrice(purchaseItem);
            }
        }

        if (sum > 9) {
            this.purchaseCounterSpan.classList.remove('purchase-counter-one-digit');
            this.purchaseCounterSpan.classList.add('purchase-counter-two-digit');
        } else {
            this.purchaseCounterSpan.classList.add('purchase-counter-one-digit');
            this.purchaseCounterSpan.classList.remove('purchase-counter-two-digit');
        }

        this.purchaseCounterSpan.innerText = sum;

        if (this.purchaseTotalPriceContainer !== undefined &&
            this.purchaseTotalPriceContainer !== null) {
            this.purchaseTotalPriceContainer.innerText = totalPrice;
        }

        const purchaseListJson = JSON.stringify(this.purchaseList);
        localStorage.setItem(this.PURCHASE_LIST_KEY, purchaseListJson);
    }

    setEventsForAddItemButton() {
        const addToBagButtons = document.getElementsByClassName('clothes-item-button');
        const purchaseBag = this;
        for (const button of addToBagButtons) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();

                const button = e.target;
                const itemId = button.getAttribute('data-clothes-item-id');

                if (purchaseBag.purchaseList[itemId] === undefined) {
                    purchaseBag.purchaseList[itemId] = { count: 1 };
                } else {
                    purchaseBag.purchaseList[itemId].count++;
                }

                purchaseBag.updatePurchaseData();

                const item = this.itemsCollection.find(x => x.id === itemId);
                Message.showMessage(item, Message.MESSAGE_TYPES.ADDED_PRODUCT);
            });
        };  
    }

    getPurchaseListItems() {
        return this.itemsCollection.filter(item => item.count > 0);
    }

    clearPurchaseList(redrawPurchaseList) {
        this.purchaseList = {};

        this.updatePurchaseData();

        if (redrawPurchaseList) {
            this.fillPurchaseListContainer();
        }
    }
}