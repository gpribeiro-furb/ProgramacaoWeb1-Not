$(document).ready(function() {
  atualizarTabela();
  $("#form-cadastro").submit(function(event) {
    event.preventDefault();

    var idAlteracao = $("#inputId").val();
    if (idAlteracao != 0 && idAlteracao != null && idAlteracao != undefined) {
      editar(idAlteracao, obterEmpregadoForm());
    } else {
      cadastrar(obterEmpregadoForm());
    }
  });

  $("#btnCancelar").click(function() {
    $("#form-cadastro").trigger("reset");
  });

  function cadastrar(empregadoNovo) {
    $.ajax({
      url: "http://rest-api-employees.jmborges.site/api/v1/create",
      type: "POST",
      data: empregadoNovo,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        atualizarTabela();
        Swal.fire(
          "Sucesso!",
          "Cadastro de empregado efetuado com sucesso",
          "success"
        ).then(result => {
          $("#form-cadastro").trigger("reset");
        });
      }
    });
  }

  function editar(idAlterar, empregadoEditado) {
    $.ajax({
      url: `	http://rest-api-employees.jmborges.site/api/v1/update/${idAlterar}`,
      type: "PUT",
      data: empregadoEditado,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        Swal.fire(
          "Sucesso!",
          "O empregado foi editado com sucesso",
          "success"
        ).then(result => {
          if (result.value) {
            $("#form-cadastro").trigger("reset");
            atualizarTabela();
          }
        });
      }
    });
    atualizarTabela();
  }

  function obterEmpregadoForm() {
    var empregado = JSON.stringify({
      id: $("#inputId").val(),
      name: $("#inputNome").val(),
      salary: $("#inputSalario").val(),
      age: $("#inputIdade").val(),
      profile_image: $("#inputAvatar").val()
    });
    return empregado;
  }
});

function atualizarTabela() {
  $.ajax({
    type: "GET",
    url: "http://rest-api-employees.jmborges.site/api/v1/employees",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(result) {
      $("table tbody tr").remove();
      result.data.forEach(data => {
        $("table tbody").append(`<tr>
        <td>${data.id}</td>
        <td>${data.employee_name}</td>
        <td>R$${data.employee_salary}</td>
        <td>${data.employee_age}</td>
        <td>${data.profile_image}</td>
        <td>
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
      var empregadoEncontrado = result.data;
      $("#inputId").val(empregadoEncontrado.id),
        $("#inputNome").val(empregadoEncontrado.employee_name),
        $("#inputSalario").val(empregadoEncontrado.employee_salary),
        $("#inputIdade").val(empregadoEncontrado.employee_age);
      $("#inputAvatar").val(empregadoEncontrado.profile_image);
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
        title: "Você tem certeza que deseja excluir o empregado?",
        text: "Não será possível reverter esta ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, desejo remover"
      }).then(result => {
        atualizarTabela();
        if (result.value) {
          Swal.fire("Sucesso!", "Empregado removido com sucesso.", "success");
        }
      });
    }
  });
}
