function generarMalla() {
    const malla = [];
    for (let x = 1; x <= 10; x++) {
        const aux = [];
        const list = document.getElementById(`list${x}`);
        for (var i = 3; i < list.childNodes.length; i++) {
            if (list.childNodes[i].childNodes[1] === undefined) {
                console.log(x, i);
                continue;
            }
            const inputValue = list.childNodes[i].childNodes[1].value;
            const [codigo, nombre, horas, creditos, semestre, electiva, codPerrequisito, crePerrequisito] = inputValue.split(",");
            const data = {
                codigo,
                nombre,
                horas,
                creditos,
                semestre: x,
                electiva,
                codPerrequisito,
                crePerrequisito
            };
            aux.push(data);
        }
        malla.push({ semestre: x, materias: aux });
    }
    console.log(malla);
}

function prueba() {
    const list = document.getElementById(`list`);
    for (var i = 0; i < list.childNodes.length; i++) {
        const inputValue = list.childNodes[i].childNodes[1].value;
        console.log(inputValue);
    }
    console.log(list.childNodes.length)
}