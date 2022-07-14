const url = 'http://localhost:8080/api/materia';
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
const toast = document.getElementById('toasts')
const types = [
    'success',
    'error'
]
function createToast(message = "Error", type = 'error') {
    let properties

    const notif = document.createElement('div')
    const notifIcon = document.createElement('span')
    const notificationType = type ? type : types[0]

    properties = setProperties(notificationType)

    notif.classList.add('toast')
    notif.classList.add(notificationType)

    notifIcon.classList.add(properties[0])
    notifIcon.classList.add(properties[1])

    notif.innerText = message;

    toast.appendChild(notif)
    notif.append(notifIcon)

    setTimeout(() => {
        notif.remove()
    }, 3000)
}

function setProperties(notificationType) {
    let propertyList

    switch (notificationType) {
        case 'error':
            propertyList = ['fas', 'fa-exclamation-circle', 1]
            break
        case 'success':
            propertyList = ['fas', 'fa-check-circle', 2]
            break
    }

    return propertyList;
}

const getAll = async () => {
    const d = document,
        $table = d.querySelector(".rwd_auto"),
        $template = d.getElementById("list").content,
        $fragment = d.createDocumentFragment();

    try {
        let res = await fetch(url),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        console.log(json)
        json.map(materia => {
            $template.querySelector(".name").textContent = materia.nombre;
            $template.querySelector(".credits").textContent = materia.creditos;
            $template.querySelector(".schedule").textContent = materia.horas;
            $template.querySelector(".microcurriculum").textContent = materia.microcurriculo;
            $template.querySelector(".edit").dataset.id = materia.id;
            $template.querySelector(".edit").dataset.nombre = materia.nombre;
            $template.querySelector(".delete").dataset.id = materia.id;
            $template.querySelector(".delete").dataset.nombre = materia.nombre;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);
    } catch (error) {
        let message = error.statusText || "Error inesperado";
        $table.insertAdjacentHTML("afterend", `<p><b> Error ${error.status}: ${message}</b></p>`);
    } finally {
        d.addEventListener('click', async e => {
            if (e.target.matches(".edit")) {

            }
            if (e.target.matches(".delete")) {
                let isDelete = confirm(`¿Estas seguro de eliminar ${e.target.dataset.nombre}?`);
                if (isDelete) {
                    try {
                        let options = {
                            method: "DELETE",
                            headers: {
                                "Content-type": "application/json;charset=utf-8"
                            }
                        }
                        let res = await fetch(url + `/${e.target.dataset.id}`, options),
                            json = await res.json();
                        console.log(json)
                        if (!res.ok) throw { status: res.status, statusText: res.statusText };
                        else await createToast("Eliminado Exitosamente", "success");
                    } catch (error) {
                        let message = error.statusText || "Error inesperado";
                        createToast(`${error.status}: ${message}`, "error");
                        // $form.insertAdjacentHTML("afterend", `<p><b> Error ${error.status}: ${message}</b></p>`);
                        //$container.innerHTML = `<p><b> Error ${error.status}: ${message}</b></p>`;
                    }
                }
            }
        })
    }

}

const onsubmit = () => {
    const $form = document.getElementById("crear-materia");
    $form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        try {
            let options = {
                method: "POST",
                headers: {
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
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
            
            let res = await fetch("http://localhost:8080/api/pensum", options),
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

