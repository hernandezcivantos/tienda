<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', '') }}</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="author" content="Civantos">
    <meta name="description" content="">

    <!-- Font Imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital@0;1&display=swap"
        rel="stylesheet">

    <!-- Core Style -->
    <link rel="stylesheet" href="{{asset('style.css')}}">

    <!-- Font Icons -->
    <link rel="stylesheet" href="{{asset('css/font-icons.css')}}">

    <!-- Toast -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/ion.rangeslider.css')}}">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/bs-filestyle.css')}}">

    <!-- Plugins/Components CSS -->
    <link rel="stylesheet" href="{{asset('css/components/bs-datatable.css')}}">

    <!-- Specific CSS -->
    @yield('css')

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{asset('css/civantos.css')}}">

    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body class="stretched side-panel-right side-push-panel">
@include('layouts.side')
<div id="loaderDiv" class="loading-container hiding">
    <div class="col-lg-3 col-md-4 col-6 loading" style="height:12.5rem;">
        <div class="css3-spinner" style="--cnvs-loader-color:var(--cnvs-themecolor);">
            <div class="css3-spinner-bounce1"></div>
            <div class="css3-spinner-bounce2"></div>
            <div class="css3-spinner-bounce3"></div>
        </div>
    </div>
</div>
<div id="wrapper">
    @include('layouts.header', ['categories' => \App\Models\Category::all()->where('active', 1)->toArray()])
    @include('layouts.breadcrumb')
    @yield('content')
    @include('layouts.footer')
</div>
<!-- Go To Top
============================================= -->
<div id="gotoTop" class="uil uil-angle-up"></div>

<!-- JavaScripts
============================================= -->
<script src="{{asset('js/plugins.min.js') }}"></script>
<script src="{{asset('js/functions.bundle.js') }}"></script>
<script
    src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
    crossorigin="anonymous"></script>
<!-- Toast -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="{{asset('js/components/rangeslider.min.js')}}"></script>
<script src="{{asset('js/components/bs-filestyle.js')}}"></script>
<script src="{{asset('js/components/bs-datatable.js')}}"></script>
<script>

    let table = new DataTable('.datatableTable', {
        language:
            {
                "processing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_ registros",
                "zeroRecords": "No se encontraron resultados",
                "emptyTable": "Ningún dato disponible en esta tabla",
                "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar:",
                "loadingRecords": "Cargando...",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad",
                    "collection": "Colección",
                    "colvisRestore": "Restaurar visibilidad",
                    "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.",
                    "copySuccess": {
                        "1": "Copiada 1 fila al portapapeles",
                        "_": "Copiadas %ds fila al portapapeles"
                    },
                    "copyTitle": "Copiar al portapapeles",
                    "csv": "CSV",
                    "excel": "Excel",
                    "pageLength": {
                        "-1": "Mostrar todas las filas",
                        "_": "Mostrar %d filas"
                    },
                    "pdf": "PDF",
                    "print": "Imprimir",
                    "renameState": "Cambiar nombre",
                    "updateState": "Actualizar",
                    "createState": "Crear Estado",
                    "removeAllStates": "Remover Estados",
                    "removeState": "Remover",
                    "savedStates": "Estados Guardados",
                    "stateRestore": "Estado %d"
                },
                "autoFill": {
                    "cancel": "Cancelar",
                    "fill": "Rellene todas las celdas con <i>%d</i>",
                    "fillHorizontal": "Rellenar celdas horizontalmente",
                    "fillVertical": "Rellenar celdas verticalmente"
                },
                "decimal": ",",
                "searchBuilder": {
                    "add": "Añadir condición",
                    "button": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "clearAll": "Borrar todo",
                    "condition": "Condición",
                    "conditions": {
                        "date": {
                            "before": "Antes",
                            "between": "Entre",
                            "empty": "Vacío",
                            "equals": "Igual a",
                            "notBetween": "No entre",
                            "not": "Diferente de",
                            "after": "Después",
                            "notEmpty": "No Vacío"
                        },
                        "number": {
                            "between": "Entre",
                            "equals": "Igual a",
                            "gt": "Mayor a",
                            "gte": "Mayor o igual a",
                            "lt": "Menor que",
                            "lte": "Menor o igual que",
                            "notBetween": "No entre",
                            "notEmpty": "No vacío",
                            "not": "Diferente de",
                            "empty": "Vacío"
                        },
                        "string": {
                            "contains": "Contiene",
                            "empty": "Vacío",
                            "endsWith": "Termina en",
                            "equals": "Igual a",
                            "startsWith": "Empieza con",
                            "not": "Diferente de",
                            "notContains": "No Contiene",
                            "notStartsWith": "No empieza con",
                            "notEndsWith": "No termina con",
                            "notEmpty": "No Vacío"
                        },
                        "array": {
                            "not": "Diferente de",
                            "equals": "Igual",
                            "empty": "Vacío",
                            "contains": "Contiene",
                            "notEmpty": "No Vacío",
                            "without": "Sin"
                        }
                    },
                    "data": "Data",
                    "deleteTitle": "Eliminar regla de filtrado",
                    "leftTitle": "Criterios anulados",
                    "logicAnd": "Y",
                    "logicOr": "O",
                    "rightTitle": "Criterios de sangría",
                    "title": {
                        "0": "Constructor de búsqueda",
                        "_": "Constructor de búsqueda (%d)"
                    },
                    "value": "Valor"
                },
                "searchPanes": {
                    "clearMessage": "Borrar todo",
                    "collapse": {
                        "0": "Paneles de búsqueda",
                        "_": "Paneles de búsqueda (%d)"
                    },
                    "count": "{total}",
                    "countFiltered": "{shown} ({total})",
                    "emptyPanes": "Sin paneles de búsqueda",
                    "loadMessage": "Cargando paneles de búsqueda",
                    "title": "Filtros Activos - %d",
                    "showMessage": "Mostrar Todo",
                    "collapseMessage": "Colapsar Todo"
                },
                "select": {
                    "cells": {
                        "1": "1 celda seleccionada",
                        "_": "%d celdas seleccionadas"
                    },
                    "columns": {
                        "1": "1 columna seleccionada",
                        "_": "%d columnas seleccionadas"
                    },
                    "rows": {
                        "1": "1 fila seleccionada",
                        "_": "%d filas seleccionadas"
                    }
                },
                "thousands": ".",
                "datetime": {
                    "previous": "Anterior",
                    "hours": "Horas",
                    "minutes": "Minutos",
                    "seconds": "Segundos",
                    "unknown": "-",
                    "amPm": [
                        "AM",
                        "PM"
                    ],
                    "months": {
                        "0": "Enero",
                        "1": "Febrero",
                        "2": "Marzo",
                        "3": "Abril",
                        "4": "Mayo",
                        "5": "Junio",
                        "6": "Julio",
                        "7": "Agosto",
                        "8": "Septiembre",
                        "9": "Octubre",
                        "10": "Noviembre",
                        "11": "Diciembre"
                    },
                    "weekdays": {
                        "0": "Dom",
                        "1": "Lun",
                        "2": "Mar",
                        "3": "Mié",
                        "4": "Jue",
                        "5": "Vie",
                        "6": "Sáb"
                    },
                    "next": "Próximo"
                },
                "editor": {
                    "close": "Cerrar",
                    "create": {
                        "button": "Nuevo",
                        "title": "Crear Nuevo Registro",
                        "submit": "Crear"
                    },
                    "edit": {
                        "button": "Editar",
                        "title": "Editar Registro",
                        "submit": "Actualizar"
                    },
                    "remove": {
                        "button": "Eliminar",
                        "title": "Eliminar Registro",
                        "submit": "Eliminar",
                        "confirm": {
                            "1": "¿Está seguro de que desea eliminar 1 fila?",
                            "_": "¿Está seguro de que desea eliminar %d filas?"
                        }
                    },
                    "error": {
                        "system": "Ha ocurrido un error en el sistema (<a target=\"\\\"rel=\"\\nofollow\"href=\"\\\">Más información&lt;\\/a&gt;).</a>"
                    },
                    "multi": {
                        "title": "Múltiples Valores",
                        "restore": "Deshacer Cambios",
                        "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo.",
                        "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, haga clic o pulse aquí, de lo contrario conservarán sus valores individuales."
                    }
                },
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "stateRestore": {
                    "creationModal": {
                        "button": "Crear",
                        "name": "Nombre:",
                        "order": "Clasificación",
                        "paging": "Paginación",
                        "select": "Seleccionar",
                        "columns": {
                            "search": "Búsqueda de Columna",
                            "visible": "Visibilidad de Columna"
                        },
                        "title": "Crear Nuevo Estado",
                        "toggleLabel": "Incluir:",
                        "scroller": "Posición de desplazamiento",
                        "search": "Búsqueda",
                        "searchBuilder": "Búsqueda avanzada"
                    },
                    "removeJoiner": "y",
                    "removeSubmit": "Eliminar",
                    "renameButton": "Cambiar Nombre",
                    "duplicateError": "Ya existe un Estado con este nombre.",
                    "emptyStates": "No hay Estados guardados",
                    "removeTitle": "Remover Estado",
                    "renameTitle": "Cambiar Nombre Estado",
                    "emptyError": "El nombre no puede estar vacío.",
                    "removeConfirm": "¿Seguro que quiere eliminar %s?",
                    "removeError": "Error al eliminar el Estado",
                    "renameLabel": "Nuevo nombre para %s:"
                },
                "infoThousands": "."
            }
    });

    const loader = $('#loaderDiv');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    function displayLoader() {
        if (loader.hasClass("hiding")) {
            loader.removeClass('hiding');
        }
    }

    function hideLoader() {
        if (!loader.hasClass("hiding")) {
            loader.addClass('hiding');
        }
    }

    /**
     * Generate a toast to display message
     * @param msg Messago to display
     * @param duration time in milsecs
     * @param success 0/1 if error/success
     */
    function toastMessage(msg, duration, success) {

        let bg = "linear-gradient(to right, #00b09b, #96c93d)";

        if (!success) {
            bg = "linear-gradient(to right, #FC7E63, #b20a2c)";
        }

        Toastify({
            text: msg,
            duration: duration,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: bg
            }
        }).showToast();
    }

    /**
     * Transform a string into a friendly url, being careful with special characters
     * @param value
     * @returns {string}
     */
    function friendlyUrl(value) {
        if (value === undefined) {
            return '';
        }

        const replacements = {
            'á': 'a',
            'é': 'e',
            'í': 'i',
            'ó': 'o',
            'ú': 'u',
            'ü': 'u',
            'ñ': 'n'
        };

        value = value.replace(/[áéíóúüñ]/g, function(match) {
            return replacements[match];
        });

        value = value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

        return value;
    }
</script>

@yield('js')
@yield('modals')
</body>
</html>
