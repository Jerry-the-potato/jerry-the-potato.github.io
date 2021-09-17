// 漢堡選單

let nav = document.querySelector("#nav");
document.querySelector("#menu-hamberger").addEventListener("click", function(event){
    // nav.style.maxHeight = "10rem";
	nav.classList.toggle("open");
}, false);