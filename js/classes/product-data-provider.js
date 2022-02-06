'use strict';

class ProductDataProvider extends DataProvider {
    constructor(itemsCollection) {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const itemId = urlParams.get('id');

        if (itemId) {
            super({
                getDataUrl: `https://script.google.com/macros/s/AKfycbxhuuHRlrzfmZKN8j65v_aAX-5a74TemLU1sUs4u_pAZ1xcksrJN6Iq3D0F3h1SP1XKbA/exec?id=${itemId}`,
                getIsShouldUpdateUrlPart: 'https://script.google.com/macros/s/AKfycbxhuuHRlrzfmZKN8j65v_aAX-5a74TemLU1sUs4u_pAZ1xcksrJN6Iq3D0F3h1SP1XKbA/exec?lastUpdated=',
                dataKey: `product-additional-info-${itemId}`,
                lastUpdatedKey: `last-update-product-addition-info-${itemId}`,
                method: 'GET'
            });

            this.product = itemsCollection.find(x => x.id === itemId);
        }
    }

    getAdditionalProductInfo(onGetData) {
        const productDataProvider = this;

        let additionalData = {};

        super.getData((jsonData) => {
            Object.keys(additionalData).forEach(propertyName => delete this.product[propertyName]);
            Object.assign(productDataProvider.product, jsonData);

            additionalData = jsonData;

            onGetData(productDataProvider.product);
        });
    }
}