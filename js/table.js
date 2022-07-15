var fila, id;
var columns = [];
var idParam = "";
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
            { data: "microcurriculo" },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
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
            { data: "url" },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        thead.innerHTML = `<tr>
            <th>Codigo</th>
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
            { data: "idMateria" },
            { data: "codPensum" },
            { data: "codigo" },
            { data: "semestre" },
            { data: "electiva" },
            { data: "codPerrequisito" },
            { data: "crePerrequisito" },
            {
                defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
            }
        ]
        thead.innerHTML = `<tr>
            <th>Id Materia</th>
            <th>Codigo Pensum</th>
            <th>Codigo</th>
            <th>Semestre</th>
            <th>Electiva</th>
            <th>Codigo Prerequisito</th>
            <th>Creditos Prerequisito</th>
            <th>Acciones</th>
          </tr>`;
    }
    const url = `http://localhost:8080/api/${idParam}`;
    tablaMaterias = $("#listAll")
        .DataTable({
            ajax: {
                url: url,
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
    $("#listAll").on("click", ".delete", function (e) {
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
                type: "DELETE",
                datatype: "json",
                data: { id },
                success: function () {
                    tablaMaterias.row(fila.parents("tr")).remove().draw();
                },
            });
        }
    });
    $("#listAll").on("click", ".edit", function (e) {
        e.preventDefault();
        fila = $(this);
        id_materia = $(this).closest("tr").find("td:eq(0)").text();
        window.location.replace(
            `dashboard.html?id=${id_materia}`
        );
    });

}