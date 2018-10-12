/**
 * The heroku hosted application URL
 */
const path = 'https://daniellamarr-fast-food-fast.herokuapp.com';

/**
 * Class FastFood contains all methods to beused to
 * consume endpoints, and support server side queries
 */
class FastFood {
    /**
     * Sends user data to HTML classes
     * @param {string} className - HTML class to hold user data
     * @param {string} str - User data to be passed
     */
    static declareUser (className,str) {
        const cl = document.getElementsByClassName(className);
        for (let i = 0; i < cl.length; i++) {
            cl[i].innerHTML = str;
        }
    }

    /**
     * User initialization - Checks if a user is logged in
     */
    static initUser () {
        if (localStorage.getItem('token')!=null) {
            const tags = document.getElementsByClassName('user-login');
            for (let i = 0; i < tags.length; i++) {
                tags[i].classList.add('hide');
            }
            const user = JSON.parse(localStorage.getItem('token'));
            const fullname = user.user.name;
            this.declareUser('fullname',fullname);
            this.declareUser('email',user.user.email);
            this.declareUser('phone',user.user.phone);
            this.declareUser('address',user.user.address);
        }else{
            const tags = document.getElementsByClassName('user-logout');
            for (let i = 0; i < tags.length; i++) {
                tags[i].classList.add('hide');
            }
        }
    }

    /**
     * Function to decode a JWT
     * @param {string} token - User Token to be decoded
     */
    static parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    
    /**
     * Error or success callback
     * @param {string} e - The callback message for request response
     * @param {number} s - The response code for any request
     */
    static errCall (e,s) {
        const error = document.getElementsByClassName('error');
        if (s == 200 || s == 201) {
            for (let i = 0; i < error.length; i++) {
                const err = error[i];
                error[i].classList.remove('hide');
                error[i].classList.remove('red');
                error[i].classList.add('green');
                error[i].innerHTML = e;
            }
        }else{
            const loader = document.getElementById('loader');
            loader.classList.add('hide');
            for (let i = 0; i < error.length; i++) {
                const err = error[i];
                error[i].classList.remove('hide');
                error[i].classList.add('red');
                error[i].innerHTML = e;
            }
        }
    }

    /**
     * FETCH API - Post Request
     * @param {string} url - Endpoint or URL for sending a request
     * @param {Object} headers - The required headers for a particular request
     * @param {Object} body - FormData() or JSON object parsed for request
     * @param {function} cb - The function triggered after requesting to a URL
     */
    static fetchPost (url, headers, body, cb) {
        fetch(path + url, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    FastFood.errCall(data.message,response.status)
                    cb(response.status,data);
                    return response.status;
                });
            }
        )
        .catch((err) => {
            loader.classList.add('hide');
            FastFood.errCall('Connection to the server failed',500);
        });
    }

    /**
     * FETCH API - Get Request
     * @param {string} url - Endpoint or URL for sending a request
     * @param {Object} headers - The required headers for a particular request
     * @param {function} cb - The function triggered after requesting to a URL
     */
    static fetchGet (url, headers, cb) {
        fetch(path + url, {
            method: 'get',
            headers: headers
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    cb(response.status,data);
                    return response.status;
                });
            }
        )
        .catch((err) => {
            FastFood.errCall('Connection to the server failed',500);
        });
    }

    /**
     * 
     * @param {Object} body - The FormData() or JSON object parsed for signup request
     */
    static signup (body) {
        this.fetchPost(
            '/api/v1/auth/signup',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,(res) => {
                if (res==201) {
                    setTimeout(()=>{window.location.href='login.html'},1200)
                }
            }
        );
    }

    /**
     * 
     * @param {Object} body The FormData() or JSON object parsed for login request
     */
    static login (body) {
        this.fetchPost(
            '/api/v1/auth/login',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,(res,data) => {
                if (res==200) {
                    setTimeout(()=>{window.location.href='index.html'},1200)
                    const user = {
                        token: data.token,
                        user: data.user
                    }
                    localStorage.setItem('token',JSON.stringify(user));
                }
            }
        )
    }

    /**
     * 
     * @param {Object} body The FormData() or JSON object parsed for login request
     */
    static adminLogin (body) {
        this.fetchPost(
            '/api/v1/auth/admin',
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body,(res,data) => {
                if (res==200) {
                    setTimeout(()=>{window.location.href='index.html'},1200);
                    localStorage.setItem('adminToken',data.token);
                }
            }
        )
    }

    /**
     * 
     * @param {Object} body The FormData() or JSON object parsed for adding a menu
     */
    static addMenu (body) {
        const adminToken = localStorage.getItem('adminToken');
        this.fetchPost(
            '/api/v1/menu',
            {
                'Content-Type': 'application/json',
                'x-access-token': adminToken
            },
            body,
            (res,data) => {
                if (res==201) {
                    setTimeout(()=>{window.location.reload(true)},1200);
                }
            }
        )
    }

    /**
     * 
     * @param {string} page - Pass ID of page, Checks which page is requesting for all menu
     */
    static getAllMenu (page) {
        this.fetchGet(
            '/api/v1/menu',
            {},
            (res,data) => {
                if (res==404) {
                    document.getElementById(page).innerHTML = 
                    '<center><h2>'+data.message+'</h2></center>';
                }else{
                    const menu = data.menu;
                    let all = "";
                    menu.forEach(x => {
                        const first = '<div class="item">'+
                            '<img src="'+x.image+'" alt="">'+
                            '<div class="item-text">';
                        let second;
                        if (page=="allmenu") {
                            second = '<a href="menu.html#menu_'+x.id+'">'+x.title+
                            '<h5 class="price">N'+x.price+'</h5>'+
                            '</a></div>';
                        }else{
                            second = '<a href="../menu.html#menu_'+x.id+'">'+x.title+'</a></div>';
                        }
                        let pricetag;
                        if (page=="allmenu") {
                            pricetag = '<div class="price-tag">'+
                                    
                                    '<input type="number" id="qty'+x.id+'" class="quantityField" value="1"><br><br>'+
                                    '<button class="addtocart"'+
                                    'onclick="addToCart(this.value,\''+x.id+'\','+x.price+',\''+x.image+'\')"'+
                                    'value="'+x.title+'">Add to cart</button>'+
                                '</div>'+
                            '</div>';
                        }else if (page=="allmenuEdit") {
                            pricetag = '<div class="price-tag">'+
                            '</div></div>';
                        }
                        all += first+second+pricetag;
                    });
                    document.getElementById(page).innerHTML = all;
                }
            }
        )
    }

    /**
     * Get a specific menu
     * @param {number} id - Specific ID to be queried
     */
    static getOneMenu (id) {
        this.fetchGet(
            `/api/v1/menu/${id}`,
            {},
            (res,data) => {
                if (res==200) {
                    const loader = document.getElementById('loader');
                    loader.classList.add('hide');
                    document.getElementById('menudetails').style.backgroundImage = `url(${data.menu.image_path})`;
                    document.getElementById('menuname').innerHTML = data.menu.title;
                    document.getElementById('menuprice').innerHTML = data.menu.price;
                    document.getElementById('menuqty').innerHTML = data.menu.quantity;
                    document.getElementById('menubtn').setAttribute('onclick',`addToCart('${data.menu.title}','${data.menu.id}',${data.menu.price},'${data.menu.image_path}')`);
                    const qty = document.getElementsByClassName('quantityField');
                    for (let i = 0; i < qty.length; i++) {
                        const x = qty[i];
                        x.setAttribute('id',`qty${data.menu.id}`);
                    }
                }else{
                    window.location.replace('index.html');
                }
            }
        )
    }

    /**
     * Function to place an order
     * @param {Object} body The FormData() or JSON object parsed for placing an order
     */
    static placeOrder (body) {
        let user;
        const usertoken = localStorage.getItem('token');
        if (usertoken==null) {
            FastFood.errCall('User has to be logged in before making an order',401);
            setTimeout(()=>{window.location.href="login.html"},1200);
            return;
        }else{
            user = JSON.parse(usertoken);
        }
        const token = user.token;
        this.fetchPost(
            '/api/v1/orders',
            {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body,
            (res,data) => {
                if (res==201) {
                    localStorage.removeItem('items');
                    setTimeout(()=>{window.location.href="index.html"},1200);
                }
            }
        )
    }

    /**
     * Get all orders of a particualar user
     * @param {number} id - User ID
     */
    static getUserOrders (id) {
        const user = JSON.parse(localStorage.getItem('token'));
        const token = user.token;
        this.fetchGet(
            `/api/v1/users/${id}/orders`,
            {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            (res,data) => {
                document.getElementById('ordersload').classList.add('hide');
                if (res==200) {
                    let dat = '';
                    for (let i = 0; i < data.order.length; i++) {
                        const x = data.order[i];
                        let b = '';
                        const food = x.food;
                        for (let i = 0; i < food.length; i++) {
                            const a = food[i];
                            b += a.orderid+' - '+a.quantity+'<br>';
                        };
                        dat += '<tr>'+
                            '<td>'+(i+1)+'</td>'+
                            '<td><a onclick="modalPop()" class="default-text" href="javascript:;">'+b+'</a></td>'+
                            '<td>'+x.price+'</td>'+
                            '<td>'+x.status+'</td>'+
                        '</tr>'
                    };
                    document.getElementById('userorders').innerHTML = dat;
                }else{
                    document.getElementById('userorders').innerHTML = data.message;
                }
            }
        )
    }

    /**
     * Checks an order status and initializes function to update order
     * @param {string} stat - Order status
     * @param {number} id - Order status to be updated
     */
    static checkStatus (stat,id) {
        let status;
        if (stat==='new') {
            status = '<button class="green" onclick="orderStatus(\'processing\','+id+')">Approve</button>'+
            '<button class="red" onclick="orderStatus(\'cancelled\','+id+')">Cancel</button>';
        }
        if (stat==='processing') {
            status = '<button class="green" onclick="orderStatus(\'complete\','+id+')">Finish Order</button>'+
            '<button class="red" onclick="orderStatus(\'cancelled\','+id+')">Cancel</button>';
        }
        if (stat==='cancelled') {
            status = '<button class="blue" onclick="orderStatus(\'new\','+id+')">Revert cancel</button>';
        }
        if (stat==='complete') {
            status = '<h5>Order Completed</h5>';
        }

        return status;
    }

    /**
     * And admin can fetch all orders on the app
     */
    static getAllOrders () {
        const adminToken = localStorage.getItem('adminToken');
        this.fetchGet(
            '/api/v1/orders',
            {
                'x-access-token': adminToken
            },
            (res,data) => {
                const allorders = document.getElementById('allorders');
                document.getElementById('ordersload').classList.add('hide');
                if (res==404) {
                    allorders.innerHTML = 
                    '<center><h2>'+data.message+'</h2></center>';
                }else{
                    const orders = data.orders;
                    let all = "";
                    for (let i = 0; i < orders.length; i++) {
                        const x = orders[i];
                        let b = "";
                        const food = x.food;
                        for (let i = 0; i < food.length; i++) {
                            const a = food[i];
                            b += a.orderid+' - '+a.quantity+'<br>';
                        };
                        all += '<tr>'+
                            '<td>'+(i+1)+'</td>'+
                            '<td>'+x.user.name+'</td>'+
                            '<td><a onclick="modalPop()" class="default-text" href="javascript:;">'+b+'</a></td>'+
                            '<td>'+x.price+'</td>'+
                            '<td>'+x.status+'</td>'+
                            '<td>'+this.checkStatus(x.status,x.id)+'</td>'+
                        '</tr>';
                    };
                    allorders.innerHTML = all;
                }
            }
        )
    }

    /**
     * Updates the status of an order
     * @param {string} body - The FormData() or JSON object parsed for updating an order status
     * @param {number} id - Order ID to be updated
     */
    static updateStatus (body,id) {
        const adminToken = localStorage.getItem('adminToken');
        fetch(path + `/api/v1/orders/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': adminToken
            },
            body: JSON.stringify(body)
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    FastFood.errCall(data.message,response.status)
                    if (response.status===200) {
                        setTimeout(()=>{window.location.reload(true)},1200);
                    }
                    return response.status;
                });
            }
        )
        .catch((err) => {
            FastFood.errCall('Connection to the server failed',500);
        });
    }

    /**
     * Logs out a user from the app
     */
    static logout (token) {
        const logout = document.getElementsByClassName('logout');
        for (let i = 0; i < logout.length; i++) {
            const logs = logout[i];
            logs.addEventListener('click', () => {
                localStorage.removeItem(token);
                window.location.href = 'login.html';
            })
        }
    }
}

FastFood.initUser();
