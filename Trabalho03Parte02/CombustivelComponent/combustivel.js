$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: `https://private-355956-elitonlunardi.apiary-mock.com/posto/1/combustivel`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
          result.forEach(data => {
            $("ul").append(`<li class="list-group-item">${data.nome} - R$ ${data.preco}</li>`);
          });
        }
    });
})

function goBack() {
    window.history.back();
}