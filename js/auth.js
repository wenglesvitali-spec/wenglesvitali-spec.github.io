function entrar(){

let login = document.getElementById('login').value;
let senha = document.getElementById('senha').value;

if(login === 'revalida2026' && senha === 'revalida2026'){

localStorage.setItem('logado','sim');
window.location.href = 'dashboard.html';

}else{

alert('Login inválido');

}
}