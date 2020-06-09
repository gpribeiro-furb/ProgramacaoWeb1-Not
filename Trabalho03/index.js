$(document).ready(function() {
  atualizarTabela();
  $("#form-cadastro").submit(function(event) {
    event.preventDefault();
    var empregadoNovo = JSON.stringify({
      name: $("#inputNome").val(),
      salary: $("#inputSalario").val(),
      age: $("#inputIdade").val()
    });

    $.ajax({
      url: "http://dummy.restapiexample.com/api/v1/create",
      type: "POST",
      data: empregadoNovo,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        var valorFormatado = data.data.salary.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        $("table tbody tr:last").after(`
        <td>${data.data.id}</td>
        <td>${data.data.name}</td>
        <td>R$${valorFormatado}</td>
        <td>${data.data.age}</td>
        <td></td>
        <td><button type="button" class="btn btn-success">Editar</td>
        `);
        Swal.fire(
          "Cadastrado",
          "Cadastro efetuado com sucesso",
          "success"
        ).then(result => {
          if (result.value) {
            $("#form-cadastro").trigger("reset");
          }
        });
      }
    });
  });

  $("#btnCancelar").click(function() {
    $("#form-cadastro").trigger("reset");
  });
});

function atualizarTabela() {
  $.ajax({
    type: "GET",
    url: "http://dummy.restapiexample.com/api/v1/employees",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      result.data.forEach(data => {
        var valorFormatado = data.employee_salary.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        $("table tbody").append(`<tr>
        <td>${data.id}</td>
        <td>${data.employee_name}</td>
        <td>R$${valorFormatado}</td>
        <td>${data.employee_age}</td>
        <td></td>
        <td><button type="button" class="btn btn-success">Editar</td>
        </tr>`);
      });
    }
  });
}
