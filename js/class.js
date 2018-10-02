const path = 'https://daniellamarr-fast-food-fast.herokuapp.com';

class FastFood {
    static declareUser (className,str) {
        const cl = document.getElementsByClassName(className);
        for (let i = 0; i < cl.length; i++) {
            cl[i].innerHTML = str;
        }
    }

    static initUser () {
        if (localStorage.getItem('token')!=null) {
            const tags = document.getElementsByClassName('user-login');
            for (let i = 0; i < tags.length; i++) {
                tags[i].classList.add('hide');
            }
            const user = JSON.parse(localStorage.getItem('token'));
            const fullname = user.user.name;
            this.declareUser('fullname',fullname);
        }else{
        }
    }

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

    static fetchPost (url, headers, body,cb) {
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
}