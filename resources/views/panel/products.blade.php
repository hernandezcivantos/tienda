@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-12 table-top-button">
                        <a id="newProductButton" href="#" class="button"><i
                                class="uil-plus"></i>{{__('Nuevo producto')}}</a>
                    </div>
                </div>

                <table id="productsTable" class="table table-bordered table-striped datatableTable">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody id="productsBody">
                    @foreach($products as $product)
                        <tr id="categoryRow{{$product->id}}">
                            <td>{{$product->id}}</td>
                            <td>{{$product->name}} </td>
                            <td>{{$product->category->name}}</td>
                            <td>{{$product->price}}</td>
                            <td>
                                <a class="productEditLink" data-id="{{$product->id}}" href="#">
                                    <i class="uil-edit" style="font-size: 18px"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </section><!-- #content end -->
@endsection

@section('modals')
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
