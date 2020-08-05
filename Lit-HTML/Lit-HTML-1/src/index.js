'use strict';

import {MyLeaf} from './MyLeaf';
import {MyTree} from './MyTree';

document.addEventListener('DOMContentLoaded', () => {
    customElements.define('my-leaf', MyLeaf);
    customElements.define('my-tree', MyTree);
});