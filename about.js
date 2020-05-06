var isOpen = false; 

 $().ready(function() {

    let modal = document.getElementById("aboutModal");
    isOpen = false; 


    $(document).keyup(function(e){
        if (e.keyCode == 27) {
            modal.style.display = "none";
            isOpen = false; 
        }
    });
   
    let closeBtn = document.getElementsByClassName("close-btn")[0];
    closeBtn.onclick = function(){
        modal.style.display = "none";
        isOpen = false; 
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        let modalButton = document.getElementById("modal-btn"); 
        if (event.target != modal && event.target != modalButton  && isOpen==true){
            modal.style.display = "none";
            isOpen = false; 
        }
    }
});

function showModal(){
    let modal = document.getElementById("aboutModal");
    modal.style.display = "block";
    isOpen = true;
}

