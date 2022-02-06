'use strict';

class CommonDataProvider extends DataProvider {
    constructor() {
        super({
            getDataUrl: 'https://script.google.com/macros/s/AKfycbx8lYeWGS_7ediKgE1d6aPvDZNupFgE2a8otUVuFy0jXiapZg5lwytb_itLfDQHNodg/exec',
            getIsShouldUpdateUrlPart: 'https://script.google.com/macros/s/AKfycbx8lYeWGS_7ediKgE1d6aPvDZNupFgE2a8otUVuFy0jXiapZg5lwytb_itLfDQHNodg/exec?lastUpdated=',
            dataKey: 'items-data-spoon-shop',
            lastUpdatedKey: 'last-update-items-data-spoon-shop',
            method: 'GET'
        });
    }

    downloadClothesItemsData(onGetData) {
        super.getData((jsonData) => onGetData(jsonData));
    }
}