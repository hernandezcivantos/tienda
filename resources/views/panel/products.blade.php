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
                        <input id="productActive" class="bt-switch" type="checkbox" checked data-on-text="Activo" data-off-text="Inactivo" data-on-color="themecolor" data-off-color="danger">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="productButtonForm" type="submit"
                                class="btn btn-green"></button>
                    </div>
                </div>
            </div>
        </div> <!-- ./ADD -->

        <!-- PRODUCT DELETE -->
        <div id="productDeleteModal" class="modal fade text-start bs-example-modal-centered" tabindex="-1"
             role="dialog" aria-labelledby="centerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">{{__('ELIMINAR PRODUCTO')}}</h4>
                        <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                                aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <p>{{__('Estás a punto de ELIMINAR este producto. ¿Es correcto?')}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="productDeleteModalButton" type="button"
                                class="btn btn-danger">{{__('Eliminar')}}</button>
                    </div>
                </div>
            </div>
        </div><!-- ./PRODUCT DELETE -->

        <!-- IMAGE DELETE -->
        <div id="productImageDeleteModal" class="modal fade text-start bs-example-modal-centered" tabindex="-1"
             role="dialog" aria-labelledby="centerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">{{__('ELIMINAR IMAGEN')}}</h4>
                        <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                                aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <p>{{__('Estás a punto de ELIMINAR una imagen asociada a este producto. ¿Es correcto?')}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="productImageDeleteModalButton" type="button"
                                class="btn btn-danger">{{__('Eliminar')}}</button>
                    </div>
                </div>
            </div>
        </div><!-- ./IMAGE DELETE -->

    </form>
@endsection

@section('js')
    <script>
        $(document).ready(function () {

            const MODAL_LABEL = $('#modalLabel');
            const DEFAULT_VAT = '21';
            const DEFAULT_DISCOUNT = '0';
            const BASE_PATH = '{{asset('public/storage/products')}}';

            let productDeleteId;

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
                            return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(
                                data.price,
                            );
                        }
                    },
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return `<a class="productEditLink" data-id="${data.id}" href="#">
                                        <i class="uil-edit" style="font-size: 18px"></i>
                                    </a>
                                    <a class="productDeleteLink" data-id="${data.id}" href="#">
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

                    $('#productActive').prop('checked', false).change();
                } else if (modalMode === 2) {
                    $('#productButtonForm').html('{{__('Editar producto')}}');

                    if ($('#productImagesDisplay').hasClass('hiding')) {
                        $('#productImagesDisplay').removeClass('hiding');
                    }
                }

                calculatePrices();
            }

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
                        `<div id="productImagePreviewFrame${element.id}" class="file-preview-frame krajee-default kv-preview-thumb rotatable">
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
                                        <button id="productImageDelete"
                                                data-id="${element.id}"
                                                type="button"
                                                class="btn btn-sm btn-danger">
                                                <i class="bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>`);
                });
            }

            $('#newProductButton').on('click', function () {
                MODAL_LABEL.html('');
                MODAL_LABEL.append('{{__('Añadir producto')}}');
                wipeProductForm(1);
                $('#productModal').modal('show');
            });

            $(document.body).on('click', '.productEditLink', function () {
                let id = $(this).data('id');

                MODAL_LABEL.html('');
                MODAL_LABEL.append('{{__('Editar producto')}}');
                wipeProductForm(2);
                $('#productID').val(id);

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('product.get') !!}',
                    data: {id: id},
                    cache: false,
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

                            $('#productActive').prop('checked', response.extra.active === 1 || response.extra.active === '1').change();

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

            $(document.body).on('click', '.productDeleteLink', function (e) {
                let id = e.currentTarget.dataset.id;

                productDeleteId = id;

                $('#productDeleteModalButton').attr('data-id', id);
                $('#productDeleteModal').modal('show');
            });

            $(document.body).on('click', '#productDeleteModalButton', function () {
                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('product.delete') !!}',
                    data: {id: productDeleteId},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            $('#productDeleteModal').modal('hide');
                            productsTable.ajax.reload();
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

            $(document.body).on('click', '#productImageDelete', function () {
                let id = $(this).data('id');

                $('#productImageDeleteModalButton').attr('data-id', id);
                $('#productImageDeleteModal').modal('show');

            });

            $(document.body).on('click', '#productImageDeleteModalButton', function () {
                let id = $(this).data('id');

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('image.delete') !!}',
                    data: {id: id},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            $('#productImageDeleteModal').modal('hide');
                            $(`#productImagePreviewFrame${id}`).remove();
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

            $(".vat-range").ionRangeSlider({
                onChange: function (data) {
                    // Called then action is done and mouse is released
                    calculatePrices();
                },
                min: 0,
                max: 100,
                from: 21
            });

            $(".discount-range").ionRangeSlider({
                onChange: function (data) {
                    // Called then action is done and mouse is released
                    calculatePrices();
                },
                min: 0,
                max: 100,
                from: 0
            });

            document.getElementById('productPrice').addEventListener("input", function () {
                calculatePrices();
            });

            $('#productForm').submit(function (e) {
                e.preventDefault();

                displayLoader();

                let data = new FormData(this);

                data.append('active', $('#productActive').prop('checked') ? 1 : 0)

                if (modalMode === 1) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('product.store') !!}',
                        data: data,
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
                } else if (modalMode === 2) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('product.update') !!}',
                        data: data,
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

            $(".bt-switch").bootstrapSwitch();
        });
    </script>
@endsection
