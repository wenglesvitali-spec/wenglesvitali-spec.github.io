let cards = [];
let todosCards = [];

let current = 0;

let acertos = 0;
let erros = 0;

const flashcard =
document.getElementById("flashcard");

const categoria =
document.getElementById("categoria");

const question =
document.getElementById("question");

const answer =
document.getElementById("answer");

const counter =
document.getElementById("counter");

const acertosEl =
document.getElementById("acertos");

const errosEl =
document.getElementById("erros");

const categoriaFiltro =
document.getElementById("categoriaFiltro");

/* ==================================================
FLIP CARD
================================================== */

flashcard.addEventListener("click", () => {

    flashcard.classList.toggle("flip");

});

/* ==================================================
CARREGAR JSON
================================================== */

async function iniciarFlashcards(){

    try{

        const response =
        await fetch("../conteudo/flashcards.json");

        todosCards =
        await response.json();

        cards = [...todosCards];

        if(cards.length === 0){

            mostrarSemCards();

            return;
        }

        carregarTema();

        carregarProgresso();

        carregarCategorias();

        carregarCard();

        atualizarContador();

    }catch(error){

        console.error(error);

        mostrarErro();

    }

}

/* ==================================================
MOSTRAR CARD
================================================== */

function carregarCard(){

    if(cards.length === 0){

        mostrarSemCards();

        return;
    }

    if(current >= cards.length){

        current = 0;
    }

    if(current < 0){

        current = cards.length - 1;
    }

    const card = cards[current];

    categoria.innerText =
    card.categoria || "Sem Categoria";

    question.innerText =
    card.pergunta || "Pergunta não encontrada";

    answer.innerText =
    card.resposta || "Resposta não encontrada";

    flashcard.classList.remove("flip");

}

/* ==================================================
PROXIMO
================================================== */

function nextCard(){

    current++;

    if(current >= cards.length){

        current = 0;
    }

    atualizarTela();

}

/* ==================================================
ANTERIOR
================================================== */

function prevCard(){

    current--;

    if(current < 0){

        current = cards.length - 1;
    }

    atualizarTela();

}

/* ==================================================
ATUALIZAR TELA
================================================== */

function atualizarTela(){

    carregarCard();

    atualizarContador();

    salvarProgresso();

}

/* ==================================================
CONTADOR
================================================== */

function atualizarContador(){

    counter.innerText =
    `${current + 1} / ${cards.length}`;

}

/* ==================================================
ACERTO
================================================== */

function marcarAcerto(){

    acertos++;

    acertosEl.innerText =
    acertos;

    salvarProgresso();

    nextCard();

}

/* ==================================================
ERRO
================================================== */

function marcarErro(){

    erros++;

    errosEl.innerText =
    erros;

    salvarProgresso();

    nextCard();

}

/* ==================================================
CATEGORIAS
================================================== */

function carregarCategorias(){

    categoriaFiltro.innerHTML =
    `<option value="Todos">
        Todas Categorias
    </option>`;

    const categorias =
    [...new Set(

        todosCards.map(
            card => card.categoria
        )

    )];

    categorias.forEach(cat => {

        const option =
        document.createElement("option");

        option.value = cat;

        option.innerText = cat;

        categoriaFiltro.appendChild(option);

    });

}

/* ==================================================
FILTRO
================================================== */

categoriaFiltro
.addEventListener("change", function(){

    const valor = this.value;

    if(valor === "Todos"){

        cards = [...todosCards];

    }else{

        cards = todosCards.filter(card =>

            card.categoria === valor

        );

    }

    current = 0;

    atualizarTela();

});

/* ==================================================
TEMA
================================================== */

function toggleDark(){

    document.body.classList.toggle("light");

    const temaAtual =

    document.body.classList.contains("light")
    ? "light"
    : "dark";

    localStorage.setItem(
        "tema",
        temaAtual
    );

}

/* ==================================================
CARREGAR TEMA
================================================== */

function carregarTema(){

    const tema =
    localStorage.getItem("tema");

    if(tema === "light"){

        document.body.classList.add("light");

    }

}

/* ==================================================
SALVAR
================================================== */

function salvarProgresso(){

    localStorage.setItem(
        "flashcardAtual",
        current
    );

    localStorage.setItem(
        "acertos",
        acertos
    );

    localStorage.setItem(
        "erros",
        erros
    );

}

/* ==================================================
CARREGAR PROGRESSO
================================================== */

function carregarProgresso(){

    const cardSalvo =
    localStorage.getItem("flashcardAtual");

    const acertosSalvos =
    localStorage.getItem("acertos");

    const errosSalvos =
    localStorage.getItem("erros");

    if(cardSalvo !== null){

        current =
        parseInt(cardSalvo);

    }

    if(acertosSalvos !== null){

        acertos =
        parseInt(acertosSalvos);

        acertosEl.innerText =
        acertos;

    }

    if(errosSalvos !== null){

        erros =
        parseInt(errosSalvos);

        errosEl.innerText =
        erros;

    }

}

/* ==================================================
RESETAR
================================================== */

function resetarProgresso(){

    localStorage.removeItem("flashcardAtual");

    localStorage.removeItem("acertos");

    localStorage.removeItem("erros");

    current = 0;

    acertos = 0;

    erros = 0;

    acertosEl.innerText = 0;

    errosEl.innerText = 0;

    atualizarTela();

}

/* ==================================================
SEM CARDS
================================================== */

function mostrarSemCards(){

    categoria.innerText =
    "Flashcards";

    question.innerText =
    "Nenhum flashcard encontrado.";

    answer.innerText =
    "Adicione cards ao JSON.";

}

/* ==================================================
ERRO JSON
================================================== */

function mostrarErro(){

    categoria.innerText =
    "Erro";

    question.innerText =
    "Erro ao carregar flashcards.";

    answer.innerText =
    "Verifique o arquivo JSON.";

}

/* ==================================================
SWIPE MOBILE
================================================== */

let touchStartX = 0;
let touchEndX = 0;

flashcard.addEventListener(
    "touchstart",
    e => {

        touchStartX =
        e.changedTouches[0].screenX;

    }
);

flashcard.addEventListener(
    "touchend",
    e => {

        touchEndX =
        e.changedTouches[0].screenX;

        handleSwipe();

    }
);

function handleSwipe(){

    const distancia =
    touchEndX - touchStartX;

    if(distancia > 80){

        prevCard();

    }

    if(distancia < -80){

        nextCard();

    }

}

/* ==================================================
INICIAR
================================================== */

iniciarFlashcards();