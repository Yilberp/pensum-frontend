const url = 'https://pensum-app.herokuapp.com/api/materia';
// window.onload = function() {
//     fetch(url).then((response) =>
//         response.json()).then(function(data) {
//         let str = "";
//         data.map(function(materia) {
//             str += `<div id='${materia.codigo}' class='card' draggable="true" ondragstart="dragStart(event)">${materia.nombre}<input type="hidden" 
//             value="${materia.codigo},${materia.nombre},${materia.horas},${materia.creditos},${materia.semestre},${materia.electiva},${materia.codPerrequisito},${materia.crePerrequisito}"></div>`;
//         })
//         return container.innerHTML = str;
//     }).catch(function(error) {
//         console.log(error)
//     })
// }
const onsubmit = () => {
    const $form = document.getElementById("crear-materia");
    $form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        try {
            let options = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem('user'),
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }

            let res = await fetch(url, options),
                json = await res.json();
            console.log(json)
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            else createToast("Guardado Exitosamente", "success");

        } catch (error) {
            let message = error.statusText || "Error inesperado";
            createToast(`${error.status}: ${message}`, "error");
            // $form.insertAdjacentHTML("afterend", `<p><b> Error ${error.status}: ${message}</b></p>`);
            //$container.innerHTML = `<p><b> Error ${error.status}: ${message}</b></p>`;

        }
    });
}

const onsubmitPensum = () => {
    const $form = document.getElementById("crear-pensum");
    $form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.pensumTerminado = data.pensumTerminado === "1"
        data.mallaTerminada = data.mallaTerminada === "1"
        console.log(JSON.stringify(data))
        try {
            let options = {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem('user'),
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }

            let res = await fetch("https://pensum-app.herokuapp.com/api/pensum", options),
                json = await res.json();
            console.log(json)
            if (!res.ok) throw { status: res.status, statusText: res.statusText };
            else createToast("Guardado Exitosamente", "success");

        } catch (error) {
            let message = error.statusText || "Error inesperado";
            createToast(`${error.status}: ${message}`, "error");
        }
    });
}