export class MyLeaf extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        // браузер вызывает этот метод при добавлении элемента в документ
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
        let leafValue = this.getLeafValue();

        if (leafValue < 0) {
            this.shadowRoot.append(this.getErrorTemplate().content.cloneNode(true));

            return;
        }

        this.shadowRoot.append(this.getTemplate(leafValue).content.cloneNode(true))
    }

    getLeafValue() {
        return parseInt(this.getAttribute('value'));
    }

    getTemplate(value) {
        let template = document.createElement('template');

        template.innerHTML = this.getCss().outerHTML;
        template.innerHTML += `<slot style="margin-bottom: 25px;">${value}</slot>`;

        return template;
    }

    getErrorTemplate() {
        let template = document.createElement('template');
        template.innerHTML = this.getCss().outerHTML;
        template.innerHTML += `
            <div class="root">
                <slot name="error">Пустые или некорректные данные</slot>
                <slot></slot>
            </div>`;

        return template;
    }

    getCss() {
        let style = document.createElement('style');
        style.innerHTML += `
            slot { display: block; float:left; width: 30px; height:20px; text-align: center; border:1px solid #6D89D5; margin-left: 35px; margin-top:-19px; }
            [name="error"] { font-size: 1.3em; color: #ff0000; }
        `;

        return style;
    }
}