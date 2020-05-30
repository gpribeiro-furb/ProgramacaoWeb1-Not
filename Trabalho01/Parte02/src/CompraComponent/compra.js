$( document ).ready(function() {
    $("#alert-form").hide();
    $('#cep').mask('00000-000');
    let produto = dados.find(x => x.id == getUrlParameter("id"));
    
    $("#img-produto").attr("src", "../../resources/produtos/"+produto.imagem);
    $("#nomeProduto").html(produto.nome);
    $("#precoProduto").html("R$ "+produto.valor.toFixed(2))
    $("#categoriaProduto").html("Categoria: "+formatarCategoria(produto.categorias[0]));

    $("#formCompra").submit(function(event){
        event.preventDefault();
        $("#alert-form").hide();
        
        var rua = $("#rua").val();
        var cidade = $("#cidade").val();
        var numero = $("#numero").val();
        var cep = $("#cep").val();
        var formaBoleto = $('input[id="formaBoleto"]:checked').val();
        var formaCartao = $('input[id="formaCartao"]:checked').val();

        if(rua == "" || rua == undefined ||
        cidade == "" || cidade == undefined ||
        numero == "" || numero == undefined ||
        cep == "" || cep == undefined ||
        (formaBoleto == undefined && formaCartao == undefined)){
            $("#alert-form").show(500);
        } else {
            Swal.fire(
                'Finalizado!',
                'Compra concluída com sucesso!',
                'success'
              ).then((result) => {
                if (result.value) {
                    location.href = "../../src/index.html";
                }
              });
        }
    })
});

function formatarCategoria(categoria) {
    switch (categoria) {
        case "roupa":
            return "Roupa";
        case "calcado":
            return "Calçado";
        case "acessorio":
            return "Acessório";
        case "equipamento":
            return "Equipamento";
        default:
            return "Outro";
    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}