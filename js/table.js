var fila, id;
$(document).ready(function () {
    const url = 'http://localhost:8080/api/materia';
    tablaMaterias = $("#listAll")
        .DataTable({
            ajax: {
                url: url,
                dataSrc: "",
            },
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            columns: [
                { data: "id" },
                { data: "nombre" },
                { data: "horas" },
                { data: "creditos" },
                { data: "microcurriculo" },
                {
                    defaultContent: `<button class='edit'>Editar</button> <button class='delete'>Eliminar</button>`,
                }
            ],
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
            `${location.origin}/administrador/actualizar-producto?id_producto=${id_materia}`
        );
    });
});