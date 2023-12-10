@extends('layouts.app')

@section('content')
    <!-- Content
		============================================= -->
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <table class="table cart mb-5">
                    <thead>
                    <tr>
                        <th class="cart-product-remove">&nbsp;</th>
                        <th class="cart-product-thumbnail">&nbsp;</th>
                        <th class="cart-product-name">{{__('Producto')}}</th>
                        <th class="cart-product-price">{{__('Precio/Unidad')}}</th>
                        <th class="cart-product-quantity">{{__('Cantidad')}}</th>
                        <th class="cart-product-subtotal">{{__('Total')}}</th>
                    </tr>
                    </thead>

                    <tbody id="cartItems"></tbody>

                </table>

                <table class="table cart mb-5">
                    <tbody>
                    <div class="row justify-content-between align-items-center py-2 col-mb-30">
                        <div class="col-lg-auto pe-lg-0">
                            <a href="" class="button button-small button-3d mt-2 mt-sm-0 me-0 mb-0">
                                {{__('Pasar por caja')}}
                            </a>
                        </div>
                    </div>
                    </tbody>
                </table>

                <div class="row col-mb-30">
                    <div class="col-lg-6">
                        <h4>{{__('Totales')}}</h4>

                        <div class="table-responsive">
                            <table class="table cart cart-totals">
                                <tbody>
                                <tr class="cart_item">
                                    <td class="cart-product-name">
                                        <strong>{{__('Subtotal')}}</strong>
                                    </td>

                                    <td class="cart-product-name">
                                        <span class="amount" id="cartSubTotal"></span>
                                    </td>
                                </tr>
                                <tr class="cart_item">
                                    <td class="cart-product-name">
                                        <strong>{{__('Impuestos')}}</strong>
                                    </td>

                                    <td class="cart-product-name">
                                        <span class="amount" id="cartVat"></span>
                                    </td>
                                </tr>
                                <tr class="cart_item">
                                    <td class="cart-product-name">
                                        <strong>{{__('Envío')}}</strong>
                                    </td>

                                    <td class="cart-product-name">
                                        <span class="amount">{{__('Envío Gratuito')}} <del>20€</del></span>
                                    </td>
                                </tr>
                                <tr class="cart_item">
                                    <td class="cart-product-name">
                                        <strong>{{__('Total')}}</strong>
                                    </td>

                                    <td class="cart-product-name">
                                        <span class="amount color lead"><strong id="cartTotal"></strong></span>
                                    </td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
@endsection

@section('modals')
    <!-- Products modals -->

    <!-- PRODUCT DELETE -->
    <div id="cartRemoveModal" class="modal fade text-start bs-example-modal-centered" tabindex="-1"
         role="dialog" aria-labelledby="centerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('Quitar producto')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                            aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <p>{{__('Estás a punto de quitar este producto del carrito de la compra. ¿Es correcto?')}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="cartRemoveProduct" type="button"
                            class="btn btn-danger">{{__('Quitar')}}</button>
                </div>
            </div>
        </div>
    </div><!-- ./PRODUCT DELETE -->

@endsection

@section('js')
    <script>


        TPJ(document).ready(function () {

            displayLoader();
            regenerateData();

            TPJ(document.body).on('click', '.removeCartItem', function (e) {
                let id = e.currentTarget.dataset.id;

                TPJ('#cartRemoveProduct').attr('data-id', id);
                TPJ('#cartRemoveModal').modal('show');
            });

            TPJ('#cartRemoveProduct').on('click', function (e) {
                let id = e.currentTarget.dataset.id;
                let tempCart;
                let targetCartItem;

                tempCart = storedCart.map(jsonString => JSON.parse(jsonString));
                targetCartItem = tempCart.filter(item => item.id === parseInt(id));
                total = total - (targetCartItem[0].price * targetCartItem[0].qty);
                badget = badget - targetCartItem[0].qty;
                tempCart = tempCart.filter(item => item.id !== parseInt(id));
                storedIDs = storedIDs.filter(item => item !== parseInt(id));
                storedCart = tempCart.map(obj => JSON.stringify(obj));

                storeCart();
                regenerateCart();
                regenerateData();
                TPJ('#cartRemoveModal').modal('hide');
            });

            function regenerateData() {

                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('cart.calculate') !!}',
                    data: {items: JSON.parse(localStorage.getItem('storedCart'))},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            TPJ('#cartSubTotal').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                0
                            ));

                            TPJ('#cartTotal').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                0
                            ));

                            TPJ('#cartVat').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                0
                            ));

                            TPJ('#cartItems').html('')

                            TPJ('#cartSubTotal').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                response.extra.totals.base_price
                            ));

                            TPJ('#cartTotal').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                response.extra.totals.final_price
                            ));

                            TPJ('#cartVat').html(new Intl.NumberFormat('de-DE', {
                                style: 'currency',
                                currency: 'EUR'
                            }).format(
                                response.extra.totals.vat
                            ));

                            TPJ.each(response.extra.items, function (key, item) {
                                TPJ('#cartItems').append(`<tr class="cart_item">
                                            <td class="cart-product-remove">
                                                <a href="#" class="remove removeCartItem" data-id="${item.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></a>
                                            </td>

                                            <td class="cart-product-thumbnail">
                                                <a href="${item.url}"><img width="64" height="64" src="${item.img}"
                                                                 alt="${item.item}"></a>
                                            </td>

                                            <td class="cart-product-name">
                                                <a href="${item.url}">${item.item}</a>
                                            </td>

                                            <td class="cart-product-price">
                                                <span class="amount">${new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(item.price)}</span>
                                            </td>

                                            <td class="cart-product-quantity">
                                                ${item.qty}
                                            </td>

                                            <td class="cart-product-subtotal">
                                                <span class="amount">${new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(item.qty * item.price)}</span>
                                            </td>
                                        </tr>`);
                            });
                        }
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


    </script>
@endsection



