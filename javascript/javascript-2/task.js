'use strict';

class CssSelectorsManager {
    constructor() {
    }

    _getSelectorByElement(element) {
        let elementSelector = '';

        elementSelector = (element.tagName) ? element.tagName : '';
        elementSelector += (element.id) ? '#' + element.id : '';
        elementSelector += (element.getAttribute('name')) ? '[name="' + element.getAttribute('name') + '"]' : '';
        elementSelector += (element.classList && Array.from(element.classList).length > 0)
            ? '.' + Array.from(element.classList).join('.')
            : '';

        if (!element.parentElement) {
            return elementSelector;
        }

        if (element === element.parentElement.querySelector(':first-child')) {
            elementSelector += ':first-child';
        } else if (element === element.parentElement.querySelector(':last-child')) {
            elementSelector += ':last-child';
        } else {
            let elementPosition = 1;

            Array.from(element.parentElement.children).forEach((sibling) => {
                if (sibling === element) {
                    elementSelector += ':nth-child(' + elementPosition + ')';
                }

                elementPosition++;
            });
        }

        return elementSelector;
    }

    _getParentSelectorsByElement(element) {
        let parentSelector = '';

        if (element.parentElement) {
            parentSelector += this._getParentSelectorsByElement(element.parentElement) + ` ` + this._getSelectorByElement(element.parentElement);

            return parentSelector;
        } else {
            return parentSelector;
        }
    }

    getFullCssSelectorByElement(element) {
        return this._getParentSelectorsByElement(element) + ' ' + this._getSelectorByElement(element);
    }
}

module.exports.cssSelectorsManagerClass = CssSelectorsManager;