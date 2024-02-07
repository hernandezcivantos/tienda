@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <table class="table cart mb-5">
                    <thead>
                    <tr>
                        <th class="cart-product-name">{{__('Producto')}}</th>
                        <th class="cart-product-price">{{__('Precio/Unidad')}}</th>
                        <th class="cart-product-quantity">{{__('Cantidad')}}</th>
                        <th class="cart-product-subtotal">{{__('Total')}}</th>
                    </tr>
                    </thead>

                    <tbody id="cartItems">
                    @foreach($products as $item)
                        <tr>
                            <td class="cart-product-name">{{$item['name']}}</td>
                            <td class="cart-product-price">{{$item['price']}}</td>
                            <td class="cart-product-quantity">{{$item['qty']}}</td>
                            <td class="cart-product-subtotal">{{$item['total']}}</td>
                        </tr>
                    @endforeach
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
                                        <span class="amount" id="cartSubTotal">{{$totals['sub']}}</span>
                                    </td>
                                </tr>
                                <tr class="cart_item">
                                    <td class="cart-product-name">
                                        <strong>{{__('Impuestos')}}</strong>
                                    </td>

                                    <td class="cart-product-name">
                                        <span class="amount" id="cartVat">{{$totals['vat']}}</span>
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
                                        <span class="amount color lead"><strong id="cartTotal">{{$totals['total']}}</strong></span>
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
