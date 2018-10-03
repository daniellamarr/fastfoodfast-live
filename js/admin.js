document.getElementById('toggle').onclick = () => {
    document.getElementById('dropdown').classList.toggle('hide');
}

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

const closeModal = (el,event) => {
    const element = document.getElementById(el);
    document.addEventListener(event,(e)=>{
        if (!e.target.matches('#'+el)) return;
        element.classList.remove("modal-show");
    })
}

modal("addmenubtn","target","click")
closeModal("addmenu","click")

modal("editmenubtn","target","click")
closeModal("editmenu","click")
