function render() {

    const productsStore = localStorageUtil.getProducts();

    headerPage.render(productsStore.length);
    productsPage.render();

}

spinnerPage.render();

let CATALOG = [];

// "https://api.jsonbin.io/b/60ba18fa9fc30168f1c3634e/latest"
// 'server/catalog.json'

fetch("server/catalog.json")
    .then(res => res.json())
    .then(body => {
        CATALOG = body;

        spinnerPage.handleClear();
        render();

    })
    .catch(error => {
        spinnerPage.handleClear();
        errorPage.render();
    })
