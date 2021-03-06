const Fast = FastFood;

const loader = document.getElementById('loader');

/**
 * Signup Function
 */
function signupFunc () {
    const trigger = (form) => {
        Fast.signup(form);
    }

    const signupForm = document.getElementById("signupForm");
    /**
     * Function to hold all data to be parsed for signup request
     */
    const signup = () => {
        const form = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value,
            cpassword: document.getElementById('cpassword').value
        }
        return form;
    }
    signupForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        loader.classList.remove('hide');
        trigger(signup());
    });
}

/**
 * Login Function
 */
function loginFunc () {
    const triggerL = (form) => {
        Fast.login(form);
    }

    const loginForm = document.getElementById("loginForm");

    /**
     * Function to hold all data to be parsed for login request
     */
    const login = () => {
        const form = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        return form;
    }

    loginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        loader.classList.remove('hide');
        triggerL(login());
    });
}

/**
 * Admin Login Function
 */
function adminLoginFunc () {
    const triggerA = (form) => {
        Fast.adminLogin(form);
    }

    const adminLoginForm = document.getElementById("adminLoginForm");

    /**
     * Function to hold all data to be parsed for admin login request
     */
    const adminLogin = () => {
        const form = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        return form;
    }

    adminLoginForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        loader.classList.remove('hide');
        triggerA(adminLogin());
    });
}

/**
 * Checks if a user is already logged in
 */
function checkUserLogin() {
    if (localStorage.getItem('token')!=null) {
        window.location.replace('index.html');
    }
}

/**
 * Check if an admin is logged in
 */
function checkAdminLogin() {
    if (localStorage.getItem('adminToken')!=null) {
        window.location.replace('index.html');
    }
}
