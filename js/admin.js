document.getElementById('toggle').onclick = () => {
    document.getElementById('dropdown').classList.toggle('hide');
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

/**
 * Check if user is logged out
 */
function checkAdminLogout() {
    if (localStorage.getItem('adminToken')==null) {
        window.location.replace('login.html');
    }
}

modal("addmenubtn","target","click")
closeModal("addmenu","click")

modal("editmenubtn","target","click")
closeModal("editmenu","click")
