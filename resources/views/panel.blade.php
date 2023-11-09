@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div id="side-navigation" class="row">

                    <div class="col-md-6 col-lg-4">
                        <div class="nav flex-column align-items-start text-start list-group" id="v-pills-tab"
                             role="tablist" aria-orientation="vertical"
                             style="--bs-list-group-active-bg: var(--cnvs-themecolor); --bs-list-group-active-border-color: var(--cnvs-themecolor);">
                            <button class="list-group-item w-100 d-flex active" id="v-pills-categories-tab"
                                    data-bs-toggle="pill" data-bs-target="#v-pills-categories" type="button" role="tab"
                                    aria-controls="v-pills-categories" aria-selected="true"><i
                                    class="me-2 bi-display"></i>{{__('Categorías')}}<i
                                    class="fa-solid fa-chevron-right ms-auto"></i></button>
                            <button class="list-group-item w-100 d-flex" id="v-pills-products-tab" data-bs-toggle="pill"
                                    data-bs-target="#v-pills-products" type="button" role="tab"
                                    aria-controls="v-pills-products" aria-selected="true"><i
                                    class="me-2 bi-backpack2"></i>{{__('Productos')}}<i
                                    class="fa-solid fa-chevron-right ms-auto"></i></button>
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
    <form id="newProductForm">
        <div id="newProductModal" class="modal fade text-start bs-example-modal-fs" tabindex="-1"
             aria-labelledby="fsModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">{{__('Añadir producto')}}</h4>
                        <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                                aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="productName">{{__('Nombre del producto')}}</label>
                                    <input id="productName" name="name" type="text" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="productCategory">{{__('Categoría')}}</label>
                                    <select id="productCategory" name="category" class="form-select">
                                        <option>{{__('Selecciona una categoría')}}</option>
                                        @foreach($categories as $category)
                                            <option class="{{$category->active ? '' : 'disabled'}}"
                                                    value="{{$category->id}}">{{$category->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productVat">{{__('Impuesto')}}</label>
                                    <input id="productVat" class="vat-range" name="vat">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productDiscount">{{__('Descuento')}}</label>
                                    <input id="productDiscount" class="discount-range" name="discount">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productPrice">{{__('Precio con IVA')}}</label>
                                    <input id="productPrice" name="price" type="number" class="form-control" step="0.1"
                                           value="0.0">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productVatPrice">{{__('Precio sin IVA')}}</label>
                                    <input id="productVatPrice" type="text" class="form-control" value="0.0" disabled>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productVatImput">{{__('IVA')}}</label>
                                    <input id="productVatImput" type="text" class="form-control" value="0.0" disabled>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="productDiscontPrice">{{__('Precio Final (IVA y Descuento)')}}</label>
                                    <input id="productDiscontPrice" type="text" class="form-control" value="0.0"
                                           disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="productWeight">{{__('Peso (Kg)')}}</label>
                                    <input id="productWeight" name="weight" type="number" class="form-control">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="productMeasures">{{__('Medidas')}}</label>
                                    <input id="productMeasures" name="measures" type="text" class="form-control"
                                           placeholder="20x20x20cm">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="fileUploadProdcut">{{__('Imágenes del producto')}}</label>
                                    <input id="fileUploadProdcut" name="productFiles[]" type="file" class="file"
                                           multiple
                                           data-show-upload="false" data-show-caption="true" data-show-preview="true">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="newProductButtonForm" class="btn btn-green">{{__('Añadir producto')}}</button>
                    </div>
                </div>
            </div>
        </div> <!-- ./ADD -->
    </form>
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

            $(".vat-range").ionRangeSlider({
                min: 0,
                max: 100,
                from: 21
            });

            $(".discount-range").ionRangeSlider({
                min: 0,
                max: 100,
                from: 0
            });

            document.getElementById('productPrice').addEventListener("input", function () {
                document.getElementById("productVatPrice").value = calculateVatPrice()
                document.getElementById("productDiscontPrice").value = calculateDiscountPrice()
                document.getElementById("productVatImput").value = calculateVat();
            });

            function calculateVatPrice() {

                let vat = parseFloat($('.vat-range').val());
                let price = parseFloat($('#productPrice').val());

                if (vat === parseFloat('0') || price === parseFloat('0')) {
                    return price;
                }

                return price - price * vat / 100;
            }

            function calculateDiscountPrice() {
                let discount = parseFloat($('.discount-range').val());
                let price = parseFloat($('#productPrice').val());

                if (discount === parseFloat('0') || price === parseFloat('0')) {
                    return price;
                }

                return price - price * discount / 100;
            }

            function calculateVat() {
                let vat = parseFloat($('.vat-range').val());
                let price = calculateDiscountPrice();

                if (vat === parseFloat('0') || price === parseFloat('0')) {
                    return price;
                }

                return price * vat / 100;
            }

            $('#newProductButtonForm').on('click', function (e) {

                e.preventDefault();

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('product.store') !!}',
                    data: $('#newProductForm').serialize(),
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            console.log(response)
                            $('#newProductModal').modal('hide');
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
            })

        });
    </script>
@endsection
