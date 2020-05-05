
var isOpenAboutdialog = false;


$().ready(function() {
    
    // document.addEventListener("click", (evt) => {
    //     const aboutElement = document.getElementById("aboutDialog");
    //     let targetElement = evt.target; // clicked element
        
    //         if (targetElement != aboutElement) {
    //             closeAboutDialog();
    //         }
    // });


    
    //let modalBtn = document.getElementById("modal-btn");
    let modal = document.getElementById("aboutModal");

    document.getElementById('aboutModal').addEventListener('keydown', (event)=>{
        if(event.keyCode == 27 && isOpenAboutdialog){
            modal.style.display = "none";
            isOpenAboutdialog = false;
        }
    });

    let closeBtn = document.querySelector(".close-btn");
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

// function closeAboutDialog() { 
// 	document.getElementById("aboutModal").display = none;
// 	isOpenAboutdialog = false;
// }

function showModal(){
    let modal = document.getElementById("aboutModal");
    modal.style.display = "block";
    isOpenAboutdialog = true;
}