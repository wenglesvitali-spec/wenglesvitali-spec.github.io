function toggleBanca(id){

let banca =
document.querySelector(
`#${id} .banca-conteudo`
);

let seta =
document.querySelector(
`#${id} .seta`
);

if(
banca.style.display === "block"
){

banca.style.display = "none";

seta.style.transform =
"rotate(0deg)";

}else{

banca.style.display = "block";

seta.style.transform =
"rotate(180deg)";

}

}
/* =========================================
MENU
========================================= */

function abrirMenu(){

const menu =
document.getElementById("menuOpcoes");

menu.style.display =

menu.style.display === "flex"
? "none"
: "flex";

}

/* =========================================
HOME
========================================= */

function irHome(){

window.location.href =
"../dashboard.html";

}

/* =========================================
FECHAR MENU CLICK FORA
========================================= */

document.addEventListener("click",function(e){

const menu =
document.getElementById("menuOpcoes");

const wrapper =
document.querySelector(".menu-wrapper");

if(!wrapper.contains(e.target)){

menu.style.display = "none";

}

});