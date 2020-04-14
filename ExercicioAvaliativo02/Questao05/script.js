function calcular() {
    let valor1 = document.getElementById("txt1").value;
    let valor2 = document.getElementById("txt2").value;
    let valor3 = document.getElementById("txt3").value;

    let soma = parseInt(valor1) + parseInt(valor2) + parseInt(valor3);
    alert(`Soma dos valores: ${soma}. ${soma%2==0 ? " É um número par" : " É um número ímpar"} `)
    document.getElementsByTagName("form")[0].reset();
}