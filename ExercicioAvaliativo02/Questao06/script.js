function calcular() {
    let valor = document.getElementById("campo").value;

    let resultado = fatorial(parseInt(valor));
    document.getElementById("resultado").value = resultado;
}

function fatorial(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  }