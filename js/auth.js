const Fast = FastFood;

/**
 * Signup
 */
function signupFunc () {
    const trigger = (form) => {
        Fast.signup(form);
    }

    const signupForm = document.getElementById("signupForm");
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