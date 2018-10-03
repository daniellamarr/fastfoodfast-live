const Fast = FastFood;

/**
 * Function to initialize adding a menu
 * @param {string} id HTML form element (ID)
 */
function uploadImage(id) {
    const formUpll = document.getElementById(id);

    /**
     * Uploads menu content to the server
     */
    function upload () {
        var form = new FormData();
        form.append('upload_preset','fastfoodfastpreset')
        form.append('file',document.getElementById('menuImage').files[0]);
        fetch('https://api.cloudinary.com/v1_1/daniel-lamarr/image/upload', {
            method: 'post',
            body: form
        })
        .then(
            (response) => {
                response.json().then(function(data) {
                    if (response.status==400) {
                        Fast.errCall('Please select an image for upload',400)
                    }else{
                        const menu = {
                            title: document.getElementById('title').value,
                            quantity: document.getElementById('quantity').value,
                            price: document.getElementById('price').value,
                            image_url: data.secure_url
                        }
                        Fast.addMenu(menu);
                    }
                });
            }
        )
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
    }
    
    formUpll.addEventListener("submit", (e)=>{
        e.preventDefault();
        upload();
    });
}
