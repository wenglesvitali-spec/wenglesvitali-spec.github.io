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