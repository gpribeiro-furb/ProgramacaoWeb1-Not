$(document).ready(function() {
  atualizarTabela();
  $("#form-cadastro").submit(function(event) {
    event.preventDefault();

    var idAlteracao = $("#inputId").val();
    if (idAlteracao != 0 && idAlteracao != null && idAlteracao != undefined) {
      editar(idAlteracao, obterPostoForm());
    } else {
      cadastrar(obterPostoForm());
    }
  });

  $("#btnCancelar").click(function() {
    $("#form-cadastro").trigger("reset");
  });

  function cadastrar(postoNovo) {
    $.ajax({
      url: "http://rest-api-employees.jmborges.site/api/v1/create",
      type: "POST",
      data: postoNovo,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        atualizarTabela();
        Swal.fire(
          "Sucesso!",
          "Cadastro de posto efetuado com sucesso",
          "success"
        ).then(result => {
          $("#form-cadastro").trigger("reset");
        });
      }
    });
  }

  function editar(idAlterar, postoEditado) {
    $.ajax({
      url: `	http://rest-api-employees.jmborges.site/api/v1/update/${idAlterar}`,
      type: "PUT",
      data: postoEditado,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $("#inputId").val('');
        $("#form-cadastro").trigger("reset");
        atualizarTabela();
        Swal.fire(
          "Sucesso!",
          "O posto foi editado com sucesso",
          "success"
        );
      }
    });
    atualizarTabela();
  }

  function obterPostoForm() {
    var posto = JSON.stringify({
      id: $("#inputId").val(),
      name: $("#inputNome").val(),
      cidade: $("#inputCidade").val(),
      bairro: $("#inputIdade").val(),
      profile_imbairro: $("#inputAvatar").val()
    });
    return posto;
  }
});

function atualizarTabela() {
  $.ajax({
    type: "GET",
    url: "https://private-475a25-elitonlunardi.apiary-mock.com/postos",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      $("table tbody tr").remove();
      result.forEach(data => {
        $("table tbody").append(`<tr>
        <td>${data.id}</td>
        <td>${data.nome}</td>
        <td>${data.cidade}</td>
        <td>${data.bairro}</td>
        <button type="button" employeeId="${data.id}" class="btn btn-success" onclick="iniciarEdicao(this)">Editar</button>
        <button type="button" employeeId="${data.id}" class="btn btn-danger" onclick="excluir(this)">Excluir</button>
        </td>
        </tr>`);
      });
    }
  });
}

function iniciarEdicao(btn) {
  var employeeId = $(btn).attr("employeeId");
  $.ajax({
    type: "GET",
    url: `http://rest-api-employees.jmborges.site/api/v1/employee/${employeeId}`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      var posto = result.data;
        $("#inputId").val(posto.id),
        $("#inputNome").val(posto.name),
        $("#inputCidade").val(posto.cidade),
        $("#inputBairro").val(posto.bairro);
    }
  });
}

function excluir(btn) {
  $("#form-cadastro").trigger("reset");
  var employeeId = $(btn).attr("employeeId");
  $.ajax({
    type: "DELETE",
    url: `http://rest-api-employees.jmborges.site/api/v1/delete/${employeeId}`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      Swal.fire({
        title: "Você tem certeza que deseja excluir o posto?",
        text: "Não será possível reverter esta ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, desejo remover"
      }).then(result => {
        atualizarTabela();
        if (result.value) {
          Swal.fire("Sucesso!", "Posto removido com sucesso.", "success");
        }
      });
    }
  });
}
