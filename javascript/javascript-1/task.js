"use strict";

class RecommendationSystem {
    constructor(inputKitItems = [], desiredItems = []) {
        if (inputKitItems.length < 1) {
            inputKitItems = this._getKitsData();
        }

        this.inputKitItems = inputKitItems;

        console.log('Historical purchasing data: ');
        console.log(this.inputKitItems);

        if (desiredItems.length < 1) {
            desiredItems = [this._getRandomItemByKits(), this._getRandomItemByKits()];
        }

        this.desiredItems = desiredItems;

        console.log('Items in current basket: ');
        console.log(this.desiredItems);

        this._initRecommendationMapByKits();
        this._initLongerRecommendationByItems();
    }

    _getKitsData() {
        const kits = [['a', 'b'], ['a', 'c'], ['d', 'e'], ['a', 'd', 'z'], ['g', 'h', 'k', 'l', 'v']];

        return kits;
    }

    _getKitsDataMap() {
        let kitsDataMap = [];

        this.inputKitItems.forEach(function (kit, kitNumber) {
            let kitMap = [];

            kit.forEach(function (item, itemNumber) {
                kitMap[item] = true;
            });

            kitsDataMap[kitNumber] = kitMap;
        });

        return kitsDataMap;
    }

    _getUniqueItemsMapByKits() {
        let uniqueItemsMapByKits = [];

        this.inputKitItems.forEach(function (kit) {
            kit.forEach(function (item) {
                uniqueItemsMapByKits[item] = true;
            });
        });

        return Object.keys(uniqueItemsMapByKits);
    }

    _getRandomItemByKits() {
        if (!this.inputKitItems || (!this.inputKitItems instanceof Array) || this.inputKitItems.length < 1) {
            throw 'Incorrect kits data detected';
        }

        let uniqueItemsByKits = this._getUniqueItemsMapByKits();
        const randItemNumber = Math.floor(Math.random() * uniqueItemsByKits.length);

        return uniqueItemsByKits[randItemNumber];
    }

    _initRecommendationMapByKits() {
        let recommendations = [];
        let kitsDataMap = this._getKitsDataMap();
        let uniqueItemsMapByKits = this._getUniqueItemsMapByKits();

        uniqueItemsMapByKits.forEach(function (item) {
            let currentItemRecommendMap = [];

            kitsDataMap.forEach(function (kitMap, key) {
                if (kitMap[item]) {
                    Object.keys(kitMap).forEach(function (kitItem) {
                        if (item !== kitItem) {
                            currentItemRecommendMap[kitItem] = true;
                        }
                    })
                }
            });

            recommendations[item] = Object.keys(currentItemRecommendMap);
        })

        this.recommendationsMap = recommendations;
    }

    _initLongerRecommendationByItems() {
        let longerRecommendationByItems = [];
        let self = this;

        this.desiredItems.forEach(function (inputItem) {
            if (self.recommendationsMap[inputItem] && self.recommendationsMap[inputItem].length > longerRecommendationByItems.length) {
                longerRecommendationByItems = self.recommendationsMap[inputItem];
            }
        });

        this.longerRecommendationByItems = longerRecommendationByItems;
    }

    getLongerRecommendationByItems () {
        return this.longerRecommendationByItems;
    }
}

let recommendationSystem = new RecommendationSystem();
console.log('Longer recommendation chain for items in basket:');
console.log(recommendationSystem.getLongerRecommendationByItems());