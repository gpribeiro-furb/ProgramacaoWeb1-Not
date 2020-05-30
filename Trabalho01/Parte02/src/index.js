$( document ).ready(function() {
    obterItens();
});

function obterItens(element){

    categorias = [];
    if(element != undefined) {
        categorias = element.id.split('-');
    }

    let conteudo = "";
    dados.forEach(element => {
        let filtro = true;
        categorias.forEach(categoria => {
            if(!element.categorias.includes(categoria)){
                filtro = false;
            }
        });

        if(filtro) {
            conteudo += `
            <a href=\"#\" class=\"link-produto\">
            <div class="produto">
                <div>
                    <figure>
                    <img class=\"imagem-produto flex-grow-1\" src=\"../resources/produtos/${element.imagem}\"/>
                    </figure>
                </div>
                <div class=\"nome-produto\">${element.nome}</div>
                <div class=\"valor-produto\">R$ ${element.valor.toFixed(2)}</div>
            </div>
            </a>`;
        }
    });
    $("#tabela").html(conteudo);
}

const dados = [
                {
                    "nome":"Camisa do Flamengo",
                    "categorias":["homem","roupa"],
                    "imagem":"1.jpg",
                    "valor":119.99
                },
                {
                    "nome":"Bermuda de banho",
                    "categorias":["homem","roupa"],
                    "imagem":"berma.jpg",
                    "valor":50.00
                },
                {
                    "nome":"Chinelo Havainas",
                    "categorias":["homem","calcado"],
                    "imagem":"chinelo.jpg",
                    "valor":40.00
                },
                {
                    "nome":"Corda de pular",
                    "categorias":["equipamento","lazer"],
                    "imagem":"corda.jpg",
                    "valor":40.00
                },
                {
                    "nome":"Tênis Nike",
                    "categorias":["homem","calcado"],
                    "imagem":"nike.jpg",
                    "valor":150.00
                },
                {
                    "nome":"Tênis Nike Shocks",
                    "categorias":["homem","calcado"],
                    "imagem":"nikeshoks.jpg",
                    "valor":200.00
                },
                {
                    "nome":"Shorts preto de banho",
                    "categorias":["homem","roupa"],
                    "imagem":"shorts.jpg",
                    "valor":59.99
                },
                {
                    "nome":"Sapato social",
                    "categorias":["homem","calcado"],
                    "imagem":"tenis.jpg",
                    "valor":154.49
                },
                {
                    "nome":"Mochila Nike preta",
                    "categorias":["homem","acessorio"],
                    "imagem":"mochilanike.jpg",
                    "valor":100.00
                },
                {
                    "nome":"Bolsa Nike cinza/rosa",
                    "categorias":["mulher","acessorio"],
                    "imagem":"bolsanikef.jpg",
                    "valor":110.00
                },
                {
                    "nome":"Agasalho rosa Feminino",
                    "categorias":["mulher","roupa"],
                    "imagem":"casacof.jpg",
                    "valor":79.99
                },
                {
                    "nome":"Tênis Oxer Feminino",
                    "categorias":["mulher","calcado"],
                    "imagem":"tenisf.jpg",
                    "valor":130.00
                },
                {
                    "nome":"Tênis Nike Feminino",
                    "categorias":["mulher","calcado"],
                    "imagem":"tenisnikef.jpg",
                    "valor":220.00
                },
                {
                    "nome":"Bermuda Oxer Feminina",
                    "categorias":["mulher","roupa"],
                    "imagem":"bermudaf.jpg",
                    "valor":19.99
                },
                {
                    "nome":"Bermuda Legging",
                    "categorias":["mulher","roupa"],
                    "imagem":"legging.jpg",
                    "valor":89.00
                },
                {
                    "nome":"Barra 40 Kg",
                    "categorias":["equipamento","academia"],
                    "imagem":"barra.jpg",
                    "valor":1200.00
                },
                {
                    "nome":"Barra H",
                    "categorias":["equipamento","academia"],
                    "imagem":"barrah.jpg",
                    "valor":560.00
                },
                {
                    "nome":"Patinete infantil",
                    "categorias":["equipamento","lazer"],
                    "imagem":"patinete.jpg",
                    "valor":289.00
                }
            ];
