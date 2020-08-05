'use strict';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const blankPageCode = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <div class="container">
            <div class="py-5 text-center">
                <h2>Test page</h2>
                <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group
                    has a validation state that can be triggered by attempting to submit the form without completing it.</p>
            </div>
            <div class="row">
                <div class="col-md-4 order-md-2 mb-4">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-muted">Your cart</span>
                        <span class="badge badge-secondary badge-pill">3</span>
                    </h4>
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">Product name</h6>
                                <small class="text-muted">Brief description</small>
                            </div>
                            <span class="text-muted">$12</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between bg-light">
                            <div class="text-success">
                                <h6 class="my-0">Promo code</h6>
                                <small>EXAMPLECODE</small>
                            </div>
                            <span class="text-success">-$5</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <footer class="my-5 pt-5 text-muted text-center text-small">
                <p class="mb-1">© 2017-2020 Company Name</p>
                <ul class="list-inline">
                    <li class="list-inline-item"><a href="#">Privacy</a></li>
                    <li class="list-inline-item"><a href="#">RequiredElement</a></li>
                    <li class="list-inline-item"><a href="#">News</a></li>
                    <li class="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </div>
    </body>
    </html>`
);

let searchedElements = {
    'li_in_middle_of_list': blankPageCode.window.document.querySelector('ul.list-inline li:nth-child(2)'),
    'unique_container_element': blankPageCode.window.document.querySelector('.container'),
};

module.exports.blankPageCode = blankPageCode;
module.exports.searchedElements = searchedElements;