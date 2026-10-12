// Array de filmes contendo no mínimo 8 itens com as propriedades solicitadas
let filmes = [
    { titulo: "Matrix", ano: 1999, genero: "Ficção", nota: 8.7, poster: "https://tse1.mm.bing.net/th/id/OIP.hEWrJSlzUXiQMoa3sYqT-AHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", link: "https://www.youtube.com/watch?v=vKQi3bBA1y8" },
    { titulo: "Toy Story", ano: 1995, genero: "Animação", nota: 8.3, poster: "https://image.tmdb.org/t/p/original/9Ijv9yyg32mlQbJDYbOoKlWlWbp.jpg", link: "https://www.youtube.com/watch?v=v-PjgYDrg70"},
    { titulo: "Interestelar", ano: 2014, genero: "Ficção", nota: 8.7, poster: "https://th.bing.com/th/id/R.ba26a3fc831a0bb87736889e02172657?rik=uXyAdlOkXmrwnw&pid=ImgRaw&r=0", link: "https://www.youtube.com/watch?v=i6avfCqKcQo"},
    { titulo: "O Poderoso Chefão", ano: 1972, genero: "Crime", nota: 9.2, poster: "https://tse1.mm.bing.net/th/id/OIP.oQ8t9aa66XZUvx2InINGYQHaKk?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", link: "https://www.youtube.com/watch?v=AKiEzQ8Gexo"},
    { titulo: "Cidade de Deus", ano: 2002, genero: "Drama", nota: 8.6, poster: "https://posterspy.com/wp-content/uploads/2023/06/CidadedeDeus_Poster.jpg", link: "https://www.youtube.com/watch?v=fZJUKixyeXM"},
    { titulo: "Batman: O Cavaleiro das Trevas", ano: 2008, genero: "Ação", nota: 9.0, poster: "https://focalizando.com.br/sites/default/files/2023-09/batman-o-cavaleiro-das-trevas-ascensao-da-escuridao.jpg", link: "https://www.youtube.com/watch?v=8sB1HTghkg4"},
    { titulo: "Vingadores: Ultimato", ano: 2019, genero: "Ação", nota: 8.4, poster: "https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg", link: "https://www.youtube.com/watch?v=PgrmbRID0eY"},
    { titulo: "A Viagem de Chihiro", ano: 2001, genero: "Animação", nota: 8.6, poster: "https://i0.wp.com/studioghibli.com.br/wp-content/uploads/2020/04/A-Viagem-de-Chihiro-DVD.jpg?fit=748%2C1074&ssl=1", link: "https://www.youtube.com/watch?v=dn2o3-wNiKE"}
];

let favoritos = [];

// Seletores de elementos do DOM
const catalogoEl = document.getElementById("catalogo");
const contadorEl = document.getElementById("contador");
const buscaInput = document.getElementById("busca");
const filtroGeneroSelect = document.getElementById("filtro-genero");
const btnInverter = document.getElementById("btn-inverter");
const listaFavoritosEl = document.getElementById("lista-favoritos");
const contadorFavoritosEl = document.getElementById("contador-favoritos");
const btnLimparFavoritos = document.getElementById("btn-limpar-favoritos");
const tituloPrincipal = document.getElementById("titulo-principal");

// Função C: Exibindo o catálogo com uma função
function mostrarFilmes(lista) {
    catalogoEl.innerHTML = "";

    if (lista.length === 0) {
        catalogoEl.innerHTML = `<div class="mensagem-vazia">Nenhum filme encontrado.</div>`;
        contadorEl.innerText = 0;
        return;
    }

    let htmlCards = "";

    // Uso de for...of para percorrer o array
    for (let i = 0; i < lista.length; i++) {
        let filme = lista[i];
        
        // Operador ternário para o selo de recomendado (nota >= 8)
        let seloRecomendado = filme.nota >= 8 ? `<span class="selo-recomendado">⭐ Recomendado</span>` : ``;

        htmlCards += `
            <div class="card-filme">
                <a href="${filme.link}" target="_blank">
                <img src="${filme.poster}" alt="Poster de ${filme.titulo}" class="card-poster">
                </a>
                <div class="card-conteudo">
                    <div>
                        <div class="card-topo">
                            <h3 class="card-titulo">${filme.titulo}</h3>
                            ${seloRecomendado}
                        </div>
                        <p class="card-info">${filme.ano} &bull; ${filme.genero} &bull; Nota: ${filme.nota}</p>
                    </div>
                    <button class="btn-favoritar" onclick="favoritar('${filme.titulo}')">♥ Favoritar</button>
                </div>
            </div>
        `;
    }

    catalogoEl.innerHTML = htmlCards;
    contadorEl.innerText = lista.length;
}

// Função D: Busca por título em tempo real
buscaInput.addEventListener("input", () => {
    let textoBusca = buscaInput.value.toLowerCase();
    let filmesFiltrados = [];

    for (let filme of filmes) {
        if (filme.titulo.toLowerCase().includes(textoBusca)) {
            filmesFiltrados.push(filme);
        }
    }

    mostrarFilmes(filmesFiltrados);
});

// Função E: Filtro por gênero usando switch
filtroGeneroSelect.addEventListener("change", () => {
    let generoEscolhido = filtroGeneroSelect.value;
    
    if (generoEscolhido === "Todos") {
        mostrarFilmes(filmes);
        return;
    }

    let filmesPorGenero = [];
    for (let filme of filmes) {
        switch (generoEscolhido) {
            case "Ação":
            case "Ficção":
            case "Animação":
            case "Drama":
            case "Crime":
                if (filme.genero === generoEscolhido) {
                    filmesPorGenero.push(filme);
                }
                break;
        }
    }

    mostrarFilmes(filmesPorGenero);
});

// Função F: Inverter ordem do catálogo com reverse()
btnInverter.addEventListener("click", () => {
    filmes.reverse();
    mostrarFilmes(filmes);
});

// Função G: Sistema de Favoritos
function favoritar(tituloFilme) {
    // Verifica se já existe com includes() para não repetir
    if (!favoritos.includes(tituloFilme)) {
        favoritos.push(tituloFilme);
        atualizarFavoritos();
    }
}

function atualizarFavoritos() {
    contadorFavoritosEl.innerText = favoritos.length;

    if (favoritos.length === 0) {
        listaFavoritosEl.innerHTML = `<li>Nenhum filme favoritados ainda.</li>`;
        return;
    }

    let htmlFavs = "";
    for (let fav of favoritos) {
        htmlFavs += `<li>&bull; ${fav}</li>`;
    }
    listaFavoritosEl.innerHTML = htmlFavs;
}

btnLimparFavoritos.addEventListener("click", () => {
    favoritos = [];
    atualizarFavoritos();
});

// Função H: Interação com o mouse (mouseenter / mouseout)
tituloPrincipal.addEventListener("mouseenter", () => {
    tituloPrincipal.style.color = "#ffffff";
});

tituloPrincipal.addEventListener("mouseout", () => {
    tituloPrincipal.style.color = "var(--accent)";
});

// Chamada inicial ao carregar a página
mostrarFilmes(filmes);