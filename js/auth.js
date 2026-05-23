function entrar(){

let login =
document.getElementById("login")
.value.trim();

let senha =
document.getElementById("senha")
.value.trim();

if(
login === "revalida2026" &&
senha === "revalida2026"
){

localStorage.setItem(
"logado",
"true"
);

window.location.href =
"dashboard.html";

}else{

alert(
"Usuário ou senha inválidos."
);

}

}

/* ENTER */

document.addEventListener(
"keydown",
function(e){

if(e.key === "Enter"){

entrar();

}

});