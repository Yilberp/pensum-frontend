const container = document.getElementById('list');
const url = 'http://localhost:8080/api/materia';
window.onload = function() {
    fetch(url).then((response) =>
        response.json()).then(function(data) {
        let str = "";
        data.map(function(materia) {
            str += `<div id='${materia.codigo}' class='card' draggable="true" ondragstart="dragStart(event)">${materia.nombre}<input type="hidden" 
            value="${materia.codigo},${materia.nombre},${materia.horas},${materia.creditos},${materia.semestre},${materia.electiva},${materia.codPerrequisito},${materia.crePerrequisito}"></div>`;
        })
        return container.innerHTML = str;
    }).catch(function(error) {
        console.log(error)
    })
}