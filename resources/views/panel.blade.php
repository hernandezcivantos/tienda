@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div id="side-navigation" class="row">

                    <div class="col-md-6 col-lg-4">

                        <div class="nav flex-column align-items-start text-start list-group" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="--bs-list-group-active-bg: var(--cnvs-themecolor); --bs-list-group-active-border-color: var(--cnvs-themecolor);">
                            <button class="list-group-item w-100 d-flex active" id="v-pills-categories-tab" data-bs-toggle="pill" data-bs-target="#v-pills-categories" type="button" role="tab" aria-controls="v-pills-categories" aria-selected="true"><i class="me-2 bi-display"></i>{{__('Categorías')}}<i class="fa-solid fa-chevron-right ms-auto"></i></button>
                            <button class="list-group-item w-100 d-flex" id="v-pills-products-tab" data-bs-toggle="pill" data-bs-target="#v-pills-products" type="button" role="tab" aria-controls="v-pills-products" aria-selected="true"><i class="me-2 bi-backpack2"></i>{{__('Productos')}}<i class="fa-solid fa-chevron-right ms-auto"></i></button>
                        </div>

                    </div>
                    <div class="col-md-6 col-lg-8">
                        <div class="tab-content" id="v-pills-tabContent">

                            @include('panel.sections.categories')
                            @include('panel.sections.products')

                        </div>
                    </div>

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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="editCategoryModalButton" type="button"
                            class="btn btn-green">{{__('Editar categoría')}}</button>
                </div>
            </div>
        </div>
    </div> <!-- ./EDIT -->

    <!-- Products modals -->
    <!-- ADD -->
    <div id="newProductModal" class="modal fade text-start" tabindex="-1" role="dialog"
         aria-labelledby="newProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('Añadir nuevo producto')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="ProductName">{{__('Nombre del producto')}}</label>
                        <input id="ProductName" name="name" type="text" class="form-control">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="newProductModalButton" type="button"
                            class="btn btn-green">{{__('Añadir producto')}}</button>
                </div>
            </div>
        </div>
    </div> <!-- ./ADD -->
@endsection

@section('js')
    <script>
        $(document).ready(function () {

            // Categories

            let categoryEditId;

            $('#newCategoryButton').on('click', function (e) {
                e.preventDefault();

                $('#categoryName').val('');
                $('#categoryRoute').val('');
                $('#newCategoryModal').modal('show');
            });

            document.getElementById('categoryName').addEventListener("input", function () {
                document.getElementById("categoryRoute").value = friendlyUrl(this.value)
            });

            document.getElementById('categoryNameEdit').addEventListener("input", function () {
                document.getElementById("categoryRouteEdit").value = friendlyUrl(this.value)
            });

            $('#newCategoryModalButton').on('click', function (e) {
                e.preventDefault();

                let data = {
                    name: $('#categoryName').val(),
                    route: friendlyUrl($('#categoryName').val())
                };

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('category.store') !!}',
                    data: data,
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            $('#newCategoryModal').modal('hide');
                            $('#categoriesBody').append(`<tr id="categoryRow${response.extra.id}"><td>${response.extra.id}</td><td>${response.extra.name}</td><td>Activa</td><td><a class="categoryEditLink" data-id="${response.extra.id}" href="#"><i class="uil-edit" style="font-size: 18px"></i></a></td></tr>`)
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

            $(document.body).on('click', '.categoryEditLink', function (e) {
                e.preventDefault();

                $('#categoryNameEdit').val('');
                $('#categoryRouteEdit').val('');

                displayLoader();

                let id = e.currentTarget.dataset.id;

                $.ajax({
                    type: 'POST',
                    url: '{!! route('category.get') !!}',
                    data: {id: id},
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            $('#categoryNameEdit').val(response.extra.name);
                            $('#categoryRouteEdit').val(response.extra.route);
                            $('#editCategoryModal').modal('show');
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

            $('#editCategoryModalButton').on('click', function (e) {
                e.preventDefault();

                let data = {
                    id: categoryEditId,
                    name: $('#categoryNameEdit').val(),
                    route: friendlyUrl($('#categoryRouteEdit').val())
                };

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('category.update') !!}',
                    data: data,
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            $('#editCategoryModal').modal('hide');
                            $('#categoryRow' + categoryEditId).html(`<td>${response.extra.id}</td><td>${response.extra.name}</td><td>${response.extra.active ? 'Activa' : 'Inactiva'}</td><td><a class="categoryEditLink" data-id="${response.extra.id}" href="#"><i class="uil-edit" style="font-size: 18px"></i></a></td>`)
                            categoryEditId = null;
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

            // Products

            function wipeNewProduct() {
                $('#productName').val('');
            }

            $('#newProductButton').on('click', function (e) {
                e.preventDefault();

                $('#newProductModal').modal('show');
            });

        });
    </script>
@endsection
