let arrayFilmes = [
    {
        titulo: "Interstellar",
        ano: 2014,
        genero: "Ficção Científica"
    },
    {
        titulo: "Joker",
        ano: 2019,
        genero: "Drama"
    },
    {
        titulo: "Avengers: Endgame",
        ano: 2019,
        genero: "Ação"
    },
];

arrayFilmes.forEach(element => {
    let section = document.getElementsByTagName("section")[0];
    section.innerHTML+= `
        <div>
            <h1>${element.titulo}</h1>
            <header>${element.ano}</header>
            <h2>${element.genero}</h2>
        </div>`;
});
