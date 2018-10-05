const getMenu = (id) => {
    if (isNaN(sub)) {
        window.location.replace('index.html');
        return;
    }
    FastFood.getOneMenu(id);
}

const href = location.href;

const menu = href.indexOf('#menu_');

const sub = href.substring(menu+6,href.length);
getMenu(sub);
window.onhashchange = () => {
    const href2 = location.href;

    const menu2 = href2.indexOf('#menu_');

    const sub2 = href.substring(menu2+6,href2.length);
    getMenu(sub2);
}