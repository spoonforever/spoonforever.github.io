'use strict';

class DataProvider {
    constructor(settings) {
        this.getDataUrl = settings.getDataUrl;
        this.getIsShouldUpdateUrlPart = settings.getIsShouldUpdateUrlPart;
        this.dataKey = settings.dataKey;
        this.lastUpdatedKey = settings.lastUpdatedKey;
        this.method = settings.method;
    }

    getData(onGetData) {
        const dataFromStorage = localStorage.getItem(this.dataKey);
        if (dataFromStorage) {
            const jsonData = JSON.parse(dataFromStorage);

            onGetData(jsonData);
        }

        if (!dataFromStorage || this.checkIfShouldUpdate()) {
            this.updateData(onGetData);
        }
    }

    checkIfShouldUpdate() {
        let result = false;
        const xhr = new XMLHttpRequest();
        xhr.open(this.method, this.createLastUpdatedUrl(), false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.response;

                result = response === 'true';
            }
        }

        xhr.send();

        return result;
    }

    updateData(onGetData) {
        this.downloadData(onGetData);

        localStorage.setItem(this.lastUpdatedKey, new Date());
    }

    downloadData(onGetData) {
        const dataProvider = this;
        const xhr = new XMLHttpRequest();
        xhr.open(this.method, this.getDataUrl);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = xhr.response;
                const jsonResult = JSON.parse(response);

                localStorage.setItem(dataProvider.dataKey, response);

                onGetData(jsonResult);
            }
        }

        xhr.send();
    }

    createLastUpdatedUrl() {
        const lastUpdated = new Date(localStorage.getItem(this.lastUpdatedKey));
        if (!lastUpdated) {
            lastUpdated = new Date(0);
        }

        const getIfShouldUpdateUrl = `${this.getIsShouldUpdateUrlPart}${lastUpdated}`;

        return getIfShouldUpdateUrl;
    }
}