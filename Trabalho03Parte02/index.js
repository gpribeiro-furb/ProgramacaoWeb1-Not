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
      url: "https://private-355956-elitonlunardi.apiary-mock.com/postos",
      type: "POST",
      data: postoNovo,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        atualizarTabela(data.data);
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

  function editar(postoEditado) {
    $.ajax({
      url: `https://private-355956-elitonlunardi.apiary-mock.com/postos`,
      type: "PUT",
      data: postoEditado,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        $("#inputId").val('');
        $("#form-cadastro").trigger("reset");
        atualizarTabela(data.data);
        Swal.fire(
          "Sucesso!",
          "O posto foi editado com sucesso",
          "success"
        );
      }
    });
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

function atualizarTabela(postoAdicionado = null) {
  $.ajax({
    type: "GET",
    url: "https://private-355956-elitonlunardi.apiary-mock.com/postos",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      console.log(postoAdicionado);
      
      $("table tbody tr").remove();
      if(postoAdicionado != null){
        result.push(postoAdicionado);
      }
      result.forEach(data => {
        $("table tbody").append(`<tr>
        <td>${data.id}</td>
        <td>${data.nome}</td>
        <td>${data.cidade}</td>
        <td>${data.bairro}</td>
        <td>
        <button type="button" postoId="${data.id}" class="btn btn-success" onclick="iniciarEdicao(this)">Editar</button>
        <button type="button" postoId="${data.id}" class="btn btn-danger" onclick="excluir(this)">Excluir</button>
        <button type="button" postoId="${data.id}" class="btn btn-info" onclick="buscarCombustiveis(this)">Lista de Combustível</button>
        </td>
        </tr>`);
      });
    }
  });
}

function iniciarEdicao(btn) {
  var postoId = $(btn).attr("postoId");
  $.ajax({
    type: "GET",
    url: `https://private-355956-elitonlunardi.apiary-mock.com/posto/11`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      var posto = result;
        $("#inputId").val(posto.id),
        $("#inputNome").val(posto.nome),
        $("#inputCidade").val(posto.cidade),
        $("#inputBairro").val(posto.bairro);
    }
  });
}

function excluir(btn) {
  $("#form-cadastro").trigger("reset");
  var postoId = $(btn).attr("postoId");
  $.ajax({
    type: "DELETE",
    url: `https://private-355956-elitonlunardi.apiary-mock.com/posto/11`,
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

function buscarCombustiveis(btn) {
  var postoId = $(btn).attr("postoId");
  location.href = "./CombustivelComponent/combustivel.component.html";
}
