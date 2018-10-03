const Fast = FastFood;

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
        triggerA(adminLogin());
    });
}
