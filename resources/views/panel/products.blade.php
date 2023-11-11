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

                <table id="productsTable" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </section><!-- #content end -->
@endsection

@section('modals')
    <!-- Products modals -->
    <!-- ADD -->
    <form id="productForm">
        <div id="productModal" class="modal fade text-start bs-example-modal-fs" tabindex="-1"
             aria-labelledby="fsModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modalLabel"></h4>
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

                        <div id="productImagesDisplay" class="file-preview hiding">
                            <div class="file-drop-zone clearfix">
                                <div id="productImagesDisplayZone" class="file-preview-thumbnails clearfix">

                                </div>
                                <div class="file-preview-status text-center text-success"></div>
                                <div class="kv-fileinput-error file-error-message" style="display: none;"></div>
                            </div>
                        </div>

                        <input id="productID" type="hidden" name="id" value="">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="productButtonForm" type="submit"
                                class="btn btn-green"></button>
                    </div>
                </div>
            </div>
        </div> <!-- ./ADD -->
    </form>
@endsection

@section('js')
    <script>
        $(document).ready(function () {

            const MODALLABEL = $('#modalLabel');
            const DEFAULT_VAT = '21';
            const DEFAULT_DISCOUNT = '0';
            const BASE_PATH = '{{asset('public/storage/products')}}';

            let modalMode;

            function wipeProductForm(mode) {
                $('#productName').val('');
                $('#productCategory').prop('selectedIndex', 0);
                $('#productVat').val('0.0');
                $('#productDiscount').val('0.0');
                $('#productPrice').val('0.0');
                $('#productWeight').val('');
                $('#productMeasures').val('');
                $('#productID').val('');

                $(".vat-range").data("ionRangeSlider").update({
                    from: DEFAULT_VAT
                });
                $(".discount-range").data("ionRangeSlider").update({
                    from: DEFAULT_DISCOUNT
                });

                $('.fileinput-remove-button').click();

                modalMode = mode;

                if (modalMode === 1) {
                    $('#productButtonForm').html('{{__('Añadir producto')}}');

                    if (!$('#productImagesDisplay').hasClass('hiding')) {
                        $('#productImagesDisplay').addClass('hiding');
                    }
                } else if (modalMode === 2) {
                    $('#productButtonForm').html('{{__('Editar producto')}}');

                    if ($('#productImagesDisplay').hasClass('hiding')) {
                        $('#productImagesDisplay').removeClass('hiding');
                    }
                }

                calculatePrices();
            }

            $('#newProductButton').on('click', function () {
                MODALLABEL.append('');
                MODALLABEL.append('{{__('Añadir producto')}}');
                wipeProductForm(1);
                $('#productModal').modal('show');
            });

            $(document.body).on('click', '.productEditLink' ,function(){
                let id = $(this).data('id');

                MODALLABEL.append('');
                MODALLABEL.append('{{__('Editar producto')}}');
                wipeProductForm(2);
                $('#productID').val(id);

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('product.get') !!}',
                    data: {id: id},
                    success: function (response) {
                        if (response.success === 1) {

                            $(".vat-range").data("ionRangeSlider").update({
                                from: response.extra.vat
                            });
                            $(".discount-range").data("ionRangeSlider").update({
                                from: response.extra.discount
                            });

                            $('#productCategory').val(response.extra.category_id)
                            $('#productName').val(response.extra.name)
                            $('#productPrice').val(response.extra.price)
                            $('#productWeight').val(response.extra.weight)
                            $('#productMeasures').val(response.extra.measures)

                            calculatePrices();
                            fillImages(response.extra.images);

                            $('#productModal').modal('show');
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
                calculatePrices();
            });

            function calculatePrices() {
                document.getElementById("productVatPrice").value = calculateVatPrice()
                document.getElementById("productDiscontPrice").value = calculateDiscountPrice()
                document.getElementById("productVatImput").value = calculateVat();
            }

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

            function fillImages(images) {

                $('#productImagesDisplayZone').html('');

                images.forEach((element) => {

                    let url = BASE_PATH + '/' + element.image;

                    $('#productImagesDisplayZone').append(
                        `<div class="file-preview-frame krajee-default kv-preview-thumb rotatable">
                            <div class="kv-file-content">
                                <img
                                    src="${url}"
                                    class="file-preview-image kv-preview-data" title="Imagen del producto ${element.product_id}"
                                    alt="Imagen del producto ${element.product_id}"
                                    style="width: auto; height: auto; max-width: 100%; max-height: 100%; image-orientation: from-image;">
                            </div>
                            <div class="file-thumbnail-footer">
                                <div class="file-actions">
                                    <div class="file-footer-buttons">
                                        <button type="button"
                                                class="btn btn-sm btn-danger"
                                                title="View Details"><i class="bi-trash"></i></button>
                                    </div>
                                </div>

                                <div class="clearfix"></div>
                            </div>
                        </div>`);
                });
            }

            $('#productForm').submit(function (e) {
                e.preventDefault();

                displayLoader();

                if(modalMode === 1) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('product.store') !!}',
                        data: new FormData(this),
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response.success === 1) {
                                productsTable.row.add(response.extra).draw();
                                $('#productModal').modal('hide');
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
                } else if(modalMode === 2) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('product.update') !!}',
                        data: new FormData(this),
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response.success === 1) {
                                productsTable.ajax.reload();
                                $('#productModal').modal('hide');
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
                }
            });

            let productsTable = new DataTable('#productsTable', {
                ajax: {
                    url: '{{route('product.all')}}',
                },
                columns: [
                    {data: 'id'},
                    {data: 'name'},
                    {data: 'category.name'},
                    {
                        data: null,
                        mRender: function (data) {
                            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                                data.price,
                            );
                        }
                    },
                    {
                        data: null,
                        bSortable: false,
                        mRender: function(data) {
                            return `<a class="productEditLink" data-id="${data.id}" href="#">
                                        <i class="uil-edit" style="font-size: 18px"></i>
                                    </a>`;
                        }
                    },
                ],
                language: {
                    url: '{{asset('js/sp.json')}}'
                }
            });
        });
    </script>
@endsection
