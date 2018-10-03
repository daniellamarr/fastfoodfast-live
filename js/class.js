/**
 * The heroku hosted application URL
 */
const path = 'https://daniellamarr-fast-food-fast.herokuapp.com';

/**
 * Class FastFood contains all methods to beused to
 * consume endpoints, and support server side queries
 */
class FastFood {
    static declareUser (className,str) {
        const cl = document.getElementsByClassName(className);
        for (let i = 0; i < cl.length; i++) {
            cl[i].innerHTML = str;
        }
    }
    
    /**
     * 
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
            for (let i = 0; i < error.length; i++) {
                const err = error[i];
                error[i].classList.remove('hide');
                error[i].classList.add('red');
                error[i].innerHTML = e;
            }
        }
    }

    /**
     * 
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
                    setTimeout(()=>{window.location.href='login.html'},3000)
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
                    setTimeout(()=>{window.location.href='index.html'},3000)
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
                    setTimeout(()=>{window.location.href='index.html'},3000);
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
                    setTimeout(()=>{window.location.reload(true)},3000);
                }
            }
        )
    }
}
