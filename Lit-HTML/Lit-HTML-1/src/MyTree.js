export class MyTree extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        let treeData = this.getTreeByData();

        if (treeData === undefined) {
            this.shadowRoot.append(this.getErrorTemplate().content.cloneNode(true));

            return;
        }

        this.shadowRoot.append(this.getTemplate(treeData).content.cloneNode(true))
    }

    getTemplate(treeData) {
        function renderLeaf(leaf, leafListString = '') {
            leafListString += `<my-leaf>${leaf.id}`;

            if (leaf.items) {
                Array.from(leaf.items).forEach(leafChild => {
                    leafListString += renderLeaf(leafChild);
                });
            }

            leafListString += `</my-leaf>`;

            return leafListString;
        }

        let template = document.createElement('template');

        template.innerHTML = this.getCss().outerHTML;
        template.innerHTML += `
            <div class="root">
                <slot name="title"></slot>
                <slot name="tree">` + renderLeaf(treeData) + `</slot>
                <slot></slot>
            </div>`;

        return template;
    }

    getCss() {
        let style = document.createElement('style');
        style.innerHTML += `
            .root { width: 500px; margin: 0 auto; text-align: center;}
            slot { display: block; margin-bottom: 10px; }
            my-leaf {display: block; width:30px; height:20px;}
            [name="title"] { font-size: 1.3em; }
            [name="error"] { font-size: 1.3em; color: #ff0000; }
            [name="tree"] { border: 1px solid #476DD5; min-height: 80px; padding:50px; }
        `;

        return style;
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

    getTreeByData() {
        let data = this.getAttribute('data');
        let validData = undefined;

        try {
            validData = JSON.parse(data);
        } catch {
        }

        return validData;
    }
}