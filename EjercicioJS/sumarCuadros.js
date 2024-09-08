function sumarCuadros(arrayNumeros) {
    let sumaTotal = 0;


    arrayNumeros.forEach((num, index) => {
        let strNum = num.toString();
        let lineLength = index + 1;  

        console.log("+ " + "-".repeat(lineLength) + " +");
        console.log(`| ${strNum} |`);
        console.log("+ " + "-".repeat(lineLength) + " +");
        sumaTotal += num;
    });


    let strSumaTotal = sumaTotal.toString();
    let lineLength = strSumaTotal.length; 

    console.log("+ " + "=".repeat(lineLength) + " +");
    console.log(`| ${strSumaTotal.padEnd(lineLength, ' ')} |`);
    console.log("+ " + "=".repeat(lineLength) + " +");
}


const arrayNumeros = [1, 23, 453, 3267, 12354, 123456];
sumarCuadros(arrayNumeros);
