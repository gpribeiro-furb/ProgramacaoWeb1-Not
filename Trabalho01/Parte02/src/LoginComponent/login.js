$( document ).ready(function() {
  $("#alert-senha-incorreta").hide();
  
  $("#formLogin").submit(function(event){
    event.preventDefault();
    $("#alert-senha-incorreta").hide();
    
    var usuario = $("#usuario").val();
    var senha = $("#senha").val();

    if(usuario == "" || usuario == undefined || senha == "" || senha == undefined){
        $("#alert-senha-incorreta").show(500);
    } else {
        location.href = "../../src/index.html";
    }
  })
});




