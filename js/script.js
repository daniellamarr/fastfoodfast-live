/**
 * Function to animate HEADER tag when there is scroll movement
 */
const winScroll = () => {
    window.onscroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("home-header").className = "hbg";
        } else {
            document.getElementById("home-header").className = "";
        }
    }
}

document.getElementById('toggle').onclick = () => {
    document.getElementById('dropdown').classList.toggle('hide');
}

const shop = document.getElementsByClassName('shoppingcart-b');
for (let i = 0; i < shop.length; i++) {
    const shopx = shop[i];
    shopx.onclick = () =>
    {
        document.getElementById('shoppingcart').classList.toggle('hide');
    }
}

/**
 * Add to Cart Function
 * @param {number} num - Number of items in cart
 * @param {string} title - Title of the item
 */
const cart = (num,title) => {
    let props ="";
    for (let k = 0; k < num; k++) {
        props += '<li>'+
            '<a href="">'+
                '<img src="images/cart/1.jpeg" alt="">'+
                '<p class="cart-title">'+title[k]+'</p>'+
                '<p>1 x N2000</p>'+
            '</a>'+
        '</li>'
    }
    document.getElementById("cart-details").innerHTML = props;
}

/**
 * Checks if an item already exists in the shopping cart
 * @param {string} name - Name of Item being checked
 * @param {array} arr - Array of items
 * @param {number} p - Price of Item
 * @param {string} img - Image of Item
 */
const checkAndAdd = (name,arr,p,img) => {
    var found = arr.some(function (el) {
      return el.order === name;
    });
    if (!found) {
        arr.push({
            order: name,
            quantity: 1,
            price: p,
            image: img
        })
    }else{
        const index = arr.findIndex(x => x.order==name);
        arr[index].quantity = arr[index].quantity + 1;
        return true;
    }
}

const addtocart = document.getElementsByClassName('addtocart');
const itemsincart = document.getElementsByClassName('itemsincart');
for (let i = 0; i < addtocart.length; i++) {
    const addtocartx = addtocart[i];
    addtocartx.onclick = () =>
    {
        let items;
        for (let j = 0; j < itemsincart.length; j++) {
            const itemsincartx = itemsincart[j];
            items = itemsincartx.innerHTML;
            itemsincartx.innerHTML = parseInt(items) + 1;
        }
        cart(parseInt(items)+1);
    }
}

/**
 * Modal Function
 * @param {string} el - HTML (CLASS) that executes this function when an event occurs
 * @param {string} attr - HTML attribute to target a div that requires modal initialization
 * @param {string} event - Event that fires function
 */
const modal = (el,attr,event) => {
    const element = document.getElementsByClassName(el);
    for (let i = 0; i < element.length; i++) {
        const classElement = element[i];
        classElement.addEventListener(event,()=>{
            const target = classElement.getAttribute(attr);
            const element2 = document.getElementById(target);
            element2.classList.add("modal-show");
        })
    }
}

let item;
if (localStorage.getItem('items')==null) {
    item = [];
    document.getElementById("cartorders").innerHTML = 'No item(s) in cart';
    document.getElementById("ordernow").classList.add('hide');
}else{
    item = JSON.parse(localStorage.getItem('items'));
    let props = "";
    let props2 = "";
    let total = [];
    for (let i = 0; i < item.length; i++) {
        const x = item[i];
        props += '<li>'+
            '<a href="">'+
                '<img src="'+x.image+'" alt="">'+
                '<p class="cart-title">'+x.order+'</p>'+
                '<p>'+x.quantity+' x '+x.price+'</p>'+
            '</a>'+
        '</li>';
        props2 += '<tr>'+
            '<td><img src="'+x.image+'" alt="Product Image" width="80px"></td>'+
            '<td>'+x.order+'</td>'+
            '<td>'+x.quantity+'</td>'+
            '<td>'+x.price+'</td>'+
            '<td>'+(x.price*x.quantity)+'</td>'+
            '<td><a class="red-text" href="javascript:;" onclick="popCart('+i+')"><i class="ti-close"></i></a></td>'+
        '</tr>';
        total.push(x.price*x.quantity);
    }
    const tot = total.reduce((total,num)=> total+num);
    const props3 = '<tr class="tabletotal">'+
        '<td colspan="4">Total:</td>'+
        '<td>'+tot+'</td><td></tr>';
    const itemsincart = document.getElementsByClassName('itemsincart');
    for (let j = 0; j < itemsincart.length; j++) {
        const itemsincartx = itemsincart[j];
        itemsincartx.innerHTML = item.length;
    }
    document.getElementById("cart-details").innerHTML = props;
    document.getElementById("cartorders").innerHTML = props2+props3;
}

/**
 * Adds an Item to the cart
 * @param {string} cl - Item being added to cart
 * @param {number} p - Price of Item
 * @param {string} img - Image of Item
 */
function addToCart (cl,p,img) {
    let props = "";
    const ch = checkAndAdd(cl,item,p,img);
    item.forEach(x => {
        props += '<li>'+
            '<a href="">'+
                '<img src="'+x.image+'" alt="">'+
                '<p class="cart-title">'+x.order+'</p>'+
                '<p>'+x.quantity+' x '+x.price+'</p>'+
            '</a>'+
        '</li>';
    })
    const itemsincart = document.getElementsByClassName('itemsincart');
    if (!ch) {
        for (let j = 0; j < itemsincart.length; j++) {
            const itemsincartx = itemsincart[j];
            items = itemsincartx.innerHTML;
            itemsincartx.innerHTML = parseInt(items) + 1;
        }
    }
    document.getElementById("cart-details").innerHTML = props;
    localStorage.setItem('items',JSON.stringify(item));
}

/**
 * Function to delete an item from user shopping cart
 * @param {number} num - The index of the item to be deleted from cart
 */
function popCart (num) {
    item.splice(num,1);
    localStorage.setItem('items',JSON.stringify(item));
    if (item.length===0) {
        localStorage.removeItem('items');
    }
    window.location.reload(true);
}

/**
 * Place an order
 */
const cartorders = () => {
    const ordernow = document.getElementById('ordernow');

    ordernow.addEventListener('click', () => {
        const loader = document.getElementById('loader');
        loader.classList.remove('hide');
        const i = localStorage.getItem('items');
        const items = JSON.parse(`${i}`)
        const item = {
            menu: items
        }
        FastFood.placeOrder(item);
    })
}

/**
 * Send a request to get all user orders
 */
function userorders () {
    const user = JSON.parse(localStorage.getItem('token'));
    const token = user.token;
    const decoded = FastFood.parseJwt(token);
    FastFood.getUserOrders(decoded.id);
}

/**
 * Close Modal Function
 * @param {string} el - HTML (ID), modal must have been triggered before function fires
 * @param {string} event Event that fires function
 */
const closeModal = (el,event) => {
    const element = document.getElementById(el);
    document.addEventListener(event,(e)=>{
        if (!e.target.matches('#'+el)) return;
        element.classList.remove("modal-show");
    })
}

modal("editprofilebtn","target","click")
closeModal("editprofile","click")
