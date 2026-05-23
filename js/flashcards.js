let cards = [];
let current = 0;

let acertos = 0;
let erros = 0;

const flashcard =
document.getElementById("flashcard");

flashcard.addEventListener("click", () => {

    flashcard.classList.toggle("flip");

});

fetch("../conteudo/flashcards.json")

.then(res => res.json())

.then(data => {

    cards = data;

    carregarProgresso();

    carregarCard();

    atualizarContador();

    carregarCategorias();

});

function carregarCard(){

    document.getElementById("categoria").innerText =
    cards[current].categoria;

    document.getElementById("question").innerText =
    cards[current].pergunta;

    document.getElementById("answer").innerText =
    cards[current].resposta;

    flashcard.classList.remove("flip");
}

function nextCard(){

    current++;

    if(current >= cards.length){

        current = 0;
    }

    carregarCard();

    atualizarContador();

    salvarProgresso();
}

function prevCard(){

    current--;

    if(current < 0){

        current = cards.length - 1;
    }

    carregarCard();

    atualizarContador();

    salvarProgresso();
}

function atualizarContador(){

    document.getElementById("counter").innerText =
    `${current + 1} / ${cards.length}`;
}

function marcarAcerto(){

    acertos++;

    document.getElementById("acertos").innerText =
    acertos;

    salvarProgresso();

    nextCard();
}

function marcarErro(){

    erros++;

    document.getElementById("erros").innerText =
    erros;

    salvarProgresso();

    nextCard();
}

function carregarCategorias(){

    let select =
    document.getElementById("categoriaFiltro");

    select.innerHTML =
    '<option value="Todos">Todas Categorias</option>';

    let categorias =
    [...new Set(cards.map(card => card.categoria))];

    categorias.forEach(cat => {

        let option =
        document.createElement("option");

        option.value = cat;

        option.innerText = cat;

        select.appendChild(option);

    });

}

document
.getElementById("categoriaFiltro")
.addEventListener("change", function(){

    let valor = this.value;

    fetch("../conteudo/flashcards.json")

    .then(res => res.json())

    .then(data => {

        if(valor === "Todos"){

            cards = data;

        }else{

            cards = data.filter(card =>

                card.categoria === valor

            );
        }

        current = 0;

        carregarCard();

        atualizarContador();

    });

});

function toggleDark(){

    document.body.classList.toggle("light");

    localStorage.setItem(

        "tema",

        document.body.classList.contains("light")
        ? "light"
        : "dark"

    );

}

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

function carregarProgresso(){

    let cardSalvo =
    localStorage.getItem("flashcardAtual");

    let acertosSalvos =
    localStorage.getItem("acertos");

    let errosSalvos =
    localStorage.getItem("erros");

    let tema =
    localStorage.getItem("tema");

    if(cardSalvo !== null){

        current = parseInt(cardSalvo);

    }

    if(acertosSalvos !== null){

        acertos = parseInt(acertosSalvos);

        document.getElementById("acertos").innerText =
        acertos;

    }

    if(errosSalvos !== null){

        erros = parseInt(errosSalvos);

        document.getElementById("erros").innerText =
        erros;

    }

    if(tema === "light"){

        document.body.classList.add("light");

    }

}

function resetarProgresso(){

    localStorage.clear();

    location.reload();

}