const plantas = document.querySelectorAll(".planta");
const pesquisa = document.getElementById("pesquisa");

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

plantas.forEach(function(planta) {
    const detalhes = planta.querySelector(".detalhes");
    const cabecalho = planta.querySelector(".cabecalho-planta");
    const vinhas = planta.querySelectorAll(".vinha");
    const folhas = planta.querySelectorAll(".folha");
    const folhasCrescendo = detalhes.querySelectorAll(".folha-crescendo");

    planta.dataset.buscaPlanta = normalizarTexto(
        planta.dataset.planta || ""
    );

    planta.dataset.buscaAluno = normalizarTexto(
        planta.dataset.aluno || ""
    );

    cabecalho.addEventListener("click", function() {
        const estavaAberta = planta.classList.contains("aberta");

        plantas.forEach(function(outraPlanta) {
            outraPlanta.classList.remove("aberta");
        });

        if (!estavaAberta) {
            planta.classList.add("aberta");

            vinhas.forEach(function(vinha) {
                vinha.style.animation = "none";
            });

            folhas.forEach(function(folha) {
                folha.style.animation = "none";
            });

            folhasCrescendo.forEach(function(folha) {
                folha.style.animation = "none";
            });

            void planta.offsetWidth;

            vinhas.forEach(function(vinha) {
                vinha.style.animation = "";
            });

            folhas.forEach(function(folha) {
                folha.style.animation = "";
            });

            folhasCrescendo.forEach(function(folha) {
                folha.style.animation = "";
            });
        }
    });
});

pesquisa.addEventListener("input", function() {
    const termo = normalizarTexto(this.value.trim());

    plantas.forEach(function(planta) {
        const encontrou =
            planta.dataset.buscaPlanta.includes(termo) ||
            planta.dataset.buscaAluno.includes(termo);

        planta.classList.toggle("escondida", !encontrou);

        if (!encontrou) {
            planta.classList.remove("aberta");
        }
    });
});

pesquisa.addEventListener("search", function() {
    if (this.value === "") {
        plantas.forEach(function(planta) {
            planta.classList.remove("escondida");
        });
    }
});