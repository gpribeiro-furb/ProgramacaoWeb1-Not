let array = ["Nike","Adidas","Puma","Jabulani","Supreme","Kaiak","Gucci","Logitech"];

let tabela = document.getElementById("tabela");
array.forEach(element => {
    tabela.innerHTML += "<li>"+element+"</li>";
});
