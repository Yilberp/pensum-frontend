var fila, id;
var columns = [];
var idParam = "";
var path = "";
window.onload = () => {
    // if ($.fn.dataTable.isDataTable('#listAll')) {
    //     $("#listAll").destroy();
    // }
    var thead = document.getElementById("thead");
    const params = window.location.search;
    if (params != '') {
        const urlParams = new URLSearchParams(params);
        idParam = urlParams.get('id');
    }
    if (idParam == "materia") {
        columns = [
            { data: "id" },
            { data: "nombre" },
            { data: "horas" },
            { data: "creditos" },
            {
                "data": "microcurriculo",
                "render": function(data, type, row, meta) {
                    return data === null || data === "" ? data : '<a href="' + data + '" target="_blank">ver microcurriculo</a>';
                }
            },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        path = `dashboard.html?id=`;
        thead.innerHTML = `<tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Creditos</th>
            <th>Horas</th>
            <th>Microcurriculo</th>
            <th>Acciones</th>
          </tr>`;
    }
    if (idParam == "pensum") {
        columns = [
            { data: "codigo" },
            { data: "pensumTerminado" },
            { data: "mallaTerminada" },
            {
                "data": "url",
                "render": function(data, type, row, meta) {
                    return data === null || data === "" ? data : '<a href="' + data + '" target="_blank">' + data + '</a>';
                }
            },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        path = `pensum.html?id=`;
        thead.innerHTML = `<tr>
            <th>Codigo</th>
            <th>Pensum terminado</th>
            <th>Malla terminada</th>
            <th>URL</th>
            <th>Acciones</th>
          </tr>`;
    }
    if (idParam == "malla/electiva") {
        columns = [
            { data: "codPensum" },
            { data: "nombre" },
            { data: "horas" },
            { data: "creditos" },
            { data: "semestre" },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        path = `pensum-electiva.html?id=`;
        thead.innerHTML = `<tr>
            <th>Codigo Pensum</th>
            <th>nombre</th>
            <th>horas</th>
            <th>credtios</th>
            <th>semestre</th>
            <th>Acciones</th>
          </tr>`;
    }
    if (idParam == "malla/materia") {
        columns = [
            { data: "idMateriaPensum" },
            { data: "codPensum" },
            { data: "nombre" },
            { data: "codigo" },
            { data: "semestre" },
            { data: "electiva" },
            { data: "codPerrequisito" },
            { data: "crePerrequisito" },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        path = `pensum-materia.html?id=`;
        thead.innerHTML = `<tr>
            <th>Id Materia</th>
            <th>Codigo Pensum</th>
            <th>Nombre</th>
            <th>Codigo</th>
            <th>Semestre</th>
            <th>Electiva</th>
            <th>Codigo Prerequisito</th>
            <th>Creditos Prerequisito</th>
            <th>Acciones</th>
          </tr>`;
    }
    const url = `https://pensum-app.herokuapp.com/api/${idParam}`;
    tablaMaterias = $("#listAll")
        .DataTable({
            ajax: {
                url: url,
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("user")
                },
                dataSrc: "",
            },
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            columns: columns,
            responsive: true
        })
        .columns.adjust()
        .responsive.recalc();
    $("#listAll").on("click", ".delete", function(e) {
        e.preventDefault();
        fila = $(this);
        if ($(this).parents("tr").hasClass('child')) { //vemos si el actual row es child row
            id = $(this).parents("tr").prev().find('td:eq(0)').text(); //si es asi, nos regresamos al row anterior, es decir, al padre y obtenemos el id
        } else {
            id = $(this).closest("tr").find('td:eq(0)').text(); //si no lo es, seguimos capturando el id del actual row
        }
        var respuesta = confirm(
            "¿Está seguro de borrar el registro " + id + "?"
        );
        if (respuesta) {
            $.ajax({
                url: url + `/${id}`,
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem("user")
                },
                type: "DELETE",
                datatype: "json",
                data: { id },
                success: function() {
                    tablaMaterias.row(fila.parents("tr")).remove().draw();
                    createToast("Eliminado Exitosamente", "success");
                },
            });
        }
    });
    $("#listAll").on("click", ".edit", function(e) {
        e.preventDefault();
        fila = $(this);
        if ($(this).parents("tr").hasClass('child')) { //vemos si el actual row es child row
            id_materia = $(this).parents("tr").prev().find('td:eq(0)').text(); //si es asi, nos regresamos al row anterior, es decir, al padre y obtenemos el id
        } else {
            id_materia = $(this).closest("tr").find('td:eq(0)').text(); //si no lo es, seguimos capturando el id del actual row
        }
        window.location.replace(
            path + id_materia
        );
    });

}