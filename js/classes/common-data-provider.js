'use strict';

class CommonDataProvider extends DataProvider {
    constructor() {
        super({
            getDataUrl: 'https://script.google.com/macros/s/AKfycbwzk8PiH-3QJ3qDyJ8Fwc4-ek0JszTeWJupbX7bQ8NZTPijnKvQUBMLh3OYGWDTWUIW/exec',
            getIsShouldUpdateUrlPart: 'https://script.google.com/macros/s/AKfycbwzk8PiH-3QJ3qDyJ8Fwc4-ek0JszTeWJupbX7bQ8NZTPijnKvQUBMLh3OYGWDTWUIW/exec?lastUpdated=',
            dataKey: 'items-data-spoon-shop',
            lastUpdatedKey: 'last-update-items-data-spoon-shop',
            method: 'GET'
        });
    }

    downloadClothesItemsData(onGetData) {
        super.getData((jsonData) => onGetData(jsonData));
    }
}