/* =========================================
IOS FIX
========================================= */

document.addEventListener(
"gesturestart",
function(e){
e.preventDefault();
}
);

/* =========================================
MENU CLOSE
========================================= */

document.addEventListener("click",(e)=>{

const menus =
document.querySelectorAll(".menu-opcoes");

menus.forEach(menu=>{

const wrapper =
menu.closest(".menu-wrapper");

if(
wrapper &&
!wrapper.contains(e.target)
){
menu.style.display = "none";
}

});

});