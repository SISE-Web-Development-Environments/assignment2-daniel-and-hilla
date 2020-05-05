
var isOpenAboutdialog = false;

 $().ready(function() {
    let modal = document.getElementById("#aboutModal");
// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close-btn")[0];

// When the user clicks the button, open the modal 


// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

    document.getElementById('aboutModal').addEventListener('keydown', (event)=>{
        if(event.keyCode == 27){
            modal.style.display = "none";
            isOpenAboutdialog = false;
        }
    });
   
    // document.addEventListener("click", (evt) => {
    //     const aboutElement = document.getElementById("aboutDialog");
    //     let targetElement = evt.target; // clicked element
        
    //         if (targetElement == aboutElement) {
    //             modal.style.display = "none";
    //         }
    // });


    
    //let modalBtn = document.getElementById("modal-btn");
    



    let closeBtn = document.getElementsByClassName("close-btn")[0];
    closeBtn.onclick = function(){
        isOpenAboutdialog = false;
        modal.style.display = "none"
    }

    window.onclick = function(e){
        if(e.target == modal){
        modal.style.display = "none";
        this.isOpenAboutdialog = false;
        }
    }

});

// // function closeAboutDialog() { 
// // 	document.getElementById("aboutModal").display = none;
// // 	isOpenAboutdialog = false;
// // }

function showModal(){
    let modal = document.getElementById("aboutModal");
    modal.style.display = "block";
    isOpenAboutdialog = true;
}



// Get the button that opens the modal
//var btn = document.getElementById("modal-btn");

// function showModal() {
//     let modal = document.getElementById("aboutModal");
//     modal.style.display = "block";
//   }