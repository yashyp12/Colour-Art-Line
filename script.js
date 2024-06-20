// Custom theme code

if (document.getElementsByClassName('clean-gallery').length > 0) {
    baguetteBox.run('.clean-gallery', { animation: 'slideIn' });
 }
 
 if (document.getElementsByClassName('clean-product').length > 0) {
     window.onload = function() {
         vanillaZoom.init('#product-preview');
     };
 }



//  
(function(window){
    function define_library() {
        var vanillaZoom = {};
        vanillaZoom.init = function(el) {

            var container = document.querySelector(el);
            if(!container) {
                console.error('No container element. Please make sure you are using the right markup.');
                return;
            }

            var firstSmallImage = container.querySelector('.small-preview');
            var zoomedImage = container.querySelector('.zoomed-image');

            if(!zoomedImage) {
                console.error('No zoomed image element. Please make sure you are using the right markup.');
                return;
            }

            if(!firstSmallImage) {
                console.error('No preview images on page. Please make sure you are using the right markup.');
                return;
            }
            else {
                // Set the source of the zoomed image.
                zoomedImage.style.backgroundImage = 'url('+ firstSmallImage.src +')';
                firstSmallImage.classList.add('active');
            }   

            // Change the selected image to be zoomed when clicking on the previews.
            container.addEventListener("click", function (event) {
                var elem = event.target;

                if (elem.classList.contains("small-preview")) {
                    
                    var allSmallPreviews = container.querySelectorAll(".small-preview");
                    
                    allSmallPreviews.forEach(function (preview) {
                        preview.classList.remove('active');
                    })
                    
                    elem.classList.add('active');
                    
                    var imageSrc = elem.src;
                    zoomedImage.style.backgroundImage = 'url('+ imageSrc +')';
                }
            });
            
            // Zoom image on mouse enter.
            zoomedImage.addEventListener('mouseenter', function(e) {
                this.style.backgroundSize = "250%"; 
            }, false);


            // Show different parts of image depending on cursor position.
            zoomedImage.addEventListener('mousemove', function(e) {
                
                // getBoundingClientReact gives us various information about the position of the element.
                var dimentions = this.getBoundingClientRect();

                // Calculate the position of the cursor inside the element (in pixels).
                var x = e.clientX - dimentions.left;
                var y = e.clientY - dimentions.top;

                // Calculate the position of the cursor as a percentage of the total width/height of the element.
                var xpercent = Math.round(100 / (dimentions.width / x));
                var ypercent = Math.round(100 / (dimentions.height / y));

                // Update the background position of the image.
                this.style.backgroundPosition = xpercent+'% ' + ypercent+'%';
            
            }, false);


            // When leaving the container zoom out the image back to normal size.
            zoomedImage.addEventListener('mouseleave', function(e) {
                this.style.backgroundSize = "contain"; 
                this.style.backgroundPosition = "left center"; 
            }, false);

        }
        return vanillaZoom;
    }

    // Add the vanillaZoom object to global scope.
    if(typeof(vanillaZoom) === 'undefined') {
        window.vanillaZoom = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);

// 
 

// contact form js 

// document.getElementById('contact-form').addEventListener('submit', async (event) => {
//     event.preventDefault();
  
//     const formData = {
//       name: event.target.name.value,
//       email: event.target.email.value,
//       subject: event.target.subject.value,
//       message: event.target.message.value
//     };
  
//     try {
//       const response = await fetch('/api/contacts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });
  
//       if (response.ok) {
//         alert('Message sent successfully');
//         event.target.reset();
//       } else {
//         alert('Failed to send message');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred');
//     }
//   });





  
  
//   adding functionality to fetch and display gallery items 

  async function fetchGalleryItems() {
    try {
      const response = await fetch('/api/gallery');
      const items = await response.json();
  
      const galleryContainer = document.getElementById('gallery-container');
      galleryContainer.innerHTML = items.map(item => `
        <div class="card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', fetchGalleryItems);
  
 