'use strict';

const htmlExample = require('./blanks/html-code-example');
const cssSelectorsManager = new (require('../task')).cssSelectorsManagerClass;

describe('1-module-2-task', () => {
    it('Проверяем, что метод getFullCssSelectorByElement возвращает непустой css селектор элемента из середина однотипного списка', () => {
        const cssSelector = cssSelectorsManager.getFullCssSelectorByElement(htmlExample.searchedElements.li_in_middle_of_list);

        expect(cssSelector.length).toBeGreaterThanOrEqual(0);
    });

    it('Проверяем, что метод getFullCssSelectorByElement возвращает непустой css селектор уникального элемента', () => {
        const cssSelector = cssSelectorsManager.getFullCssSelectorByElement(htmlExample.searchedElements.unique_container_element);

        expect(cssSelector.length).toBeGreaterThanOrEqual(0);
    });

    it('Проверяем, что возвращаемые CSS селекторы соответствуют только одному элементу', () => {
        const firstCssSelector = cssSelectorsManager.getFullCssSelectorByElement(
            htmlExample.searchedElements.li_in_middle_of_list
        );
        const secondCssSelector = cssSelectorsManager.getFullCssSelectorByElement(
            htmlExample.searchedElements.unique_container_element
        );

        expect(htmlExample.blankPageCode.window.document.querySelectorAll(firstCssSelector).length).toBe(1);
        expect(htmlExample.blankPageCode.window.document.querySelectorAll(secondCssSelector).length).toBe(1);
    });

    it('Проверяем, что по полученными CSS селекторам возращается первоначальный элемент', () => {
        const liInMiddleOfList = htmlExample.searchedElements.li_in_middle_of_list;
        const uniqueContainerElement = htmlExample.searchedElements.unique_container_element;
        const liInMiddleOfListCssSelector = cssSelectorsManager.getFullCssSelectorByElement(liInMiddleOfList);
        const uniqueContainerElementCssSelector = cssSelectorsManager.getFullCssSelectorByElement(uniqueContainerElement);

        expect(Array.from(htmlExample.blankPageCode.window.document.querySelectorAll(liInMiddleOfListCssSelector)).shift()).toEqual(liInMiddleOfList);
        expect(Array.from(htmlExample.blankPageCode.window.document.querySelectorAll(uniqueContainerElementCssSelector)).shift()).toEqual(uniqueContainerElement);
    });
});