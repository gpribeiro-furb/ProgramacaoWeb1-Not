$( document ).ready(function() {
    obterItens();

    $("#filtro").change(function () {
        obterItens(null, $("#filtro").val());
    });
});

function obterItens(element, textoFiltrado=""){

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

        console.log(filtro);
        

        if(textoFiltrado != ""  && !element.nome.toLowerCase().includes(textoFiltrado.toLowerCase())){
            filtro = false;
        }

        if(filtro) {
            conteudo += `
            <a href=\"./CompraComponent/compra.html?id=${element.id}\" class=\"link-produto\">
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
                    "id": 1,
                    "nome":"Camisa do Flamengo",
                    "categorias":["roupa", "homem"],
                    "imagem":"1.jpg",
                    "valor":119.99
                },
                {
                    "id": 2,
                    "nome":"Bermuda de banho",
                    "categorias":["roupa", "homem"],
                    "imagem":"berma.jpg",
                    "valor":50.00
                },
                {
                    "id": 3,
                    "nome":"Chinelo Havainas",
                    "categorias":["calcado", "homem"],
                    "imagem":"chinelo.jpg",
                    "valor":40.00
                },
                {
                    "id": 4,
                    "nome":"Corda de pular",
                    "categorias":["equipamento","lazer"],
                    "imagem":"corda.jpg",
                    "valor":40.00
                },
                {
                    "id": 5,
                    "nome":"Tênis Nike",
                    "categorias":["calcado", "homem"],
                    "imagem":"nike.jpg",
                    "valor":150.00
                },
                {
                    "id": 6,
                    "nome":"Tênis Nike Shocks",
                    "categorias":["calcado", "homem"],
                    "imagem":"nikeshoks.jpg",
                    "valor":200.00
                },
                {
                    "id": 7,
                    "nome":"Shorts preto de banho",
                    "categorias":["roupa", "homem"],
                    "imagem":"shorts.jpg",
                    "valor":59.99
                },
                {
                    "id": 8,
                    "nome":"Sapato social",
                    "categorias":["calcado", "homem"],
                    "imagem":"tenis.jpg",
                    "valor":154.49
                },
                {
                    "id": 9,
                    "nome":"Mochila Nike preta",
                    "categorias":["acessorio", "homem"],
                    "imagem":"mochilanike.jpg",
                    "valor":100.00
                },
                {
                    "id": 10,
                    "nome":"Bolsa Nike cinza/rosa",
                    "categorias":["acessorio", "mulher"],
                    "imagem":"bolsanikef.jpg",
                    "valor":110.00
                },
                {
                    "id": 11,
                    "nome":"Agasalho rosa Feminino",
                    "categorias":["roupa", "mulher"],
                    "imagem":"casacof.jpg",
                    "valor":79.99
                },
                {
                    "id": 12,
                    "nome":"Tênis Oxer Feminino",
                    "categorias":["calcado", "mulher"],
                    "imagem":"tenisf.jpg",
                    "valor":130.00
                },
                {
                    "id": 13,
                    "nome":"Tênis Nike Feminino",
                    "categorias":["calcado", "mulher"],
                    "imagem":"tenisnikef.jpg",
                    "valor":220.00
                },
                {
                    "id": 14,
                    "nome":"Bermuda Oxer Feminina",
                    "categorias":["roupa", "mulher"],
                    "imagem":"bermudaf.jpg",
                    "valor":19.99
                },
                {
                    "id": 15,
                    "nome":"Bermuda Legging",
                    "categorias":["roupa", "mulher"],
                    "imagem":"legging.jpg",
                    "valor":89.00
                },
                {
                    "id": 16,
                    "nome":"Barra 40 Kg",
                    "categorias":["equipamento","academia"],
                    "imagem":"barra.jpg",
                    "valor":1200.00
                },
                {
                    "id": 17,
                    "nome":"Barra H",
                    "categorias":["equipamento","academia"],
                    "imagem":"barrah.jpg",
                    "valor":560.00
                },
                {
                    "id": 18,
                    "nome":"Patinete infantil",
                    "categorias":["equipamento","lazer"],
                    "imagem":"patinete.jpg",
                    "valor":289.00
                }
            ];
