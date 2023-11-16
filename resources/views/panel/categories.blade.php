@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="tab-pane fade show active" id="v-pills-categories" role="tabpanel"
                     aria-labelledby="v-pills-categories-tab" tabindex="0">

                    <div class="row">
                        <div class="col-12 table-top-button">
                            <a id="newCategoryButton" href="#" class="button"><i
                                    class="uil-plus"></i>{{__('Nueva categoría')}}</a>
                        </div>
                    </div>

                    <table id="categoriesTable" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{{__('Nombre')}}</th>
                            <th>{{__('Estado')}}</th>
                            <th>{{__('Acciones')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>


            </div>

        </div>
    </section><!-- #content end -->
@endsection

@section('modals')
    <!-- Categories modals -->
    <!-- ADD -->
    <div id="newCategoryModal" class="modal fade text-start" tabindex="-1" role="dialog"
         aria-labelledby="newCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('Añadir nueva categoría')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="categoryName">{{__('Nombre de la categoría')}}</label>
                        <input id="categoryName" name="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="categoryRoute">{{__('Ruta de la categoría')}}</label>
                        <input id="categoryRoute" type="text" class="form-control" disabled>
                    </div>
                </div>
                <div class="modal-footer">
                    <input id="newCategoryActive" class="bt-switch" type="checkbox" checked data-on-text="Activa" data-off-text="Inactiva" data-on-color="themecolor" data-off-color="danger">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="newCategoryModalButton" type="button"
                            class="btn btn-green">{{__('Crear categoría')}}</button>
                </div>
            </div>
        </div>
    </div> <!-- ./ADD -->

    <!-- EDIT -->
    <div id="editCategoryModal" class="modal fade text-start" tabindex="-1" role="dialog"
         aria-labelledby="newCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('Editar categoría')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="categoryNameEdit">{{__('Nombre de la categoría')}}</label>
                        <input id="categoryNameEdit" name="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="categoryRouteEdit">{{__('Ruta de la categoría')}}</label>
                        <input id="categoryRouteEdit" type="text" class="form-control" disabled>
                    </div>
                </div>
                <div class="modal-footer">
                    <input id="editCategoryActive" class="bt-switch" type="checkbox" checked data-on-text="Activa" data-off-text="Inactiva" data-on-color="themecolor" data-off-color="danger">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="editCategoryModalButton" type="button"
                            class="btn btn-green">{{__('Editar categoría')}}</button>
                </div>
            </div>
        </div>
    </div> <!-- ./EDIT -->

    <!-- CATEGORY DELETE -->
    <div id="categoryDeleteModal" class="modal fade text-start bs-example-modal-centered" tabindex="-1"
         role="dialog" aria-labelledby="centerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('ELIMINAR CATEGORIA')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                            aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <p>{{__('Estás a punto de ELIMINAR esta categoría. ¿Es correcto?')}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="categoryDeleteModalButton" type="button"
                            class="btn btn-danger">{{__('Eliminar')}}</button>
                </div>
            </div>
        </div>
    </div><!-- ./CATEGORY DELETE -->
@endsection

@section('js')
    <script>
        TPJ(document).ready(function () {
            let categoryEditId;
            let categoryDeleteId;

            let categoriesTable = new DataTable('#categoriesTable', {
                ajax: {
                    url: '{{route('category.all')}}',
                },
                columns: [
                    {data: 'id'},
                    {data: 'name'},
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return data.active === 1 || data.active === '1' ? 'Activa' : 'Inactiva';
                        }
                    },
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return `<a class="categoryEditLink" data-id="${data.id}" href="#">
                                        <i class="uil-edit" style="font-size: 18px"></i>
                                    </a>
                                    <a class="categoryDeleteLink" data-id="${data.id}" href="#">
                                        <i class="uil-trash" style="font-size: 18px"></i>
                                    </a>
                                    `;
                        }
                    },
                ],
                language: {
                    url: '{{asset('js/sp.json')}}'
                }
            });

            TPJ('#newCategoryButton').on('click', function (e) {
                e.preventDefault();

                TPJ('#categoryName').val('');
                TPJ('#categoryRoute').val('');
                TPJ('#editCategoryActive').prop('checked', true).change();
                TPJ('#newCategoryModal').modal('show');
            });

            document.getElementById('categoryName').addEventListener("input", function () {
                document.getElementById("categoryRoute").value = friendlyUrl(this.value)
            });

            document.getElementById('categoryNameEdit').addEventListener("input", function () {
                document.getElementById("categoryRouteEdit").value = friendlyUrl(this.value)
            });

            TPJ('#newCategoryModalButton').on('click', function (e) {
                e.preventDefault();

                let data = {
                    name: TPJ('#categoryName').val(),
                    route: friendlyUrl(TPJ('#categoryName').val()),
                    active: TPJ('#newCategoryActive').prop('checked') ? 1 : 0
                };

                displayLoader();

                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('category.store') !!}',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            categoriesTable.row.add(response.extra).draw();
                            TPJ('#newCategoryModal').modal('hide');
                            regenerateCategoryMenu();
                        }
                        toastMessage(response.message, 5000, response.success);
                    },
                    error: function (error) {
                        toastMessage(error.message, 5000, 0);
                    },
                    complete: function (e) {
                        hideLoader();
                    }
                });
            });

            TPJ(document.body).on('click', '.categoryEditLink', function (e) {
                e.preventDefault();

                TPJ('#categoryNameEdit').val('');
                TPJ('#categoryRouteEdit').val('');
                TPJ('#editCategoryActive').prop('checked', false).change();

                displayLoader();

                let id = e.currentTarget.dataset.id;

                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('category.get') !!}',
                    data: {id: id},
                    cache: false,
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            TPJ('#categoryNameEdit').val(response.extra.name);
                            TPJ('#categoryRouteEdit').val(response.extra.route);
                            if(response.extra.active === 1 || response.extra.active === '1') {
                                TPJ('#editCategoryActive').prop('checked', true).change();
                            } else {
                                TPJ('#editCategoryActive').prop('checked', false).change();
                            }
                            TPJ('#editCategoryModal').modal('show');
                            categoryEditId = id;
                            hideLoader();
                        } else {
                            toastMessage(response.message, 5000, 0);
                        }
                    },
                    error: function (error) {
                        toastMessage(error.message, 5000, 0);
                    },
                    complete: function (e) {
                        hideLoader();
                    }
                });
            });

            TPJ('#editCategoryModalButton').on('click', function (e) {
                e.preventDefault();

                let data = {
                    id: categoryEditId,
                    name: TPJ('#categoryNameEdit').val(),
                    route: friendlyUrl(TPJ('#categoryRouteEdit').val()),
                    active: TPJ('#editCategoryActive').prop('checked') ? 1 : 0,
                };

                displayLoader();

                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('category.update') !!}',
                    data: data,
                    cache: false,
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            TPJ('#editCategoryModal').modal('hide');
                            categoriesTable.ajax.reload();
                            categoryEditId = null;
                            regenerateCategoryMenu();
                        }
                        toastMessage(response.message, 5000, response.success);
                    },
                    error: function (error) {
                        toastMessage(error.message, 5000, 0);
                    },
                    complete: function (e) {
                        hideLoader();
                    }
                });
            });

            TPJ(document.body).on('click', '.categoryDeleteLink', function (e) {
                let id = e.currentTarget.dataset.id;

                categoryDeleteId = id;

                TPJ('#categoryDeleteModalButton').attr('data-id', id);
                TPJ('#categoryDeleteModal').modal('show');
            });

            TPJ(document.body).on('click', '#categoryDeleteModalButton', function () {
                displayLoader();

                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('category.delete') !!}',
                    data: {id: categoryDeleteId},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            TPJ('#categoryDeleteModal').modal('hide');
                            categoriesTable.ajax.reload();
                            regenerateCategoryMenu();
                        }
                        toastMessage(response.message, 5000, response.success);
                    },
                    error: function (error) {
                        toastMessage(error.message, 5000, 0);
                    },
                    complete: function (e) {
                        hideLoader();
                    }
                });

            });

            TPJ(".bt-switch").bootstrapSwitch();
        });
    </script>
@endsection
