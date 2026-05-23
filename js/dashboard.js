if(localStorage.getItem('logado') !== 'sim'){
window.location.href = 'login.html';
}

function sair(){
localStorage.removeItem('logado');
window.location.href = 'login.html';
}