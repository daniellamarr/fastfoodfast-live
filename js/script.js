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
 */
let cart = (num) => {
    let props ="";
    for (let k = 0; k < num; k++) {
        props += '<li>'+
            '<a href="">'+
                '<img src="images/cart/1.jpeg" alt="">'+
                '<p class="cart-title">Hamburger</p>'+
                '<p>1 x N2000</p>'+
            '</a>'+
        '</li>'
    }
    document.getElementById("cart-details").innerHTML = props;
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
