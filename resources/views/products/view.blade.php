@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="single-product">
                    <div class="product">
                        <div class="row gutter-40">

                            <div class="col-md-5">

                                <!-- Product Single - Gallery
                                ============================================= -->
                                <div id="product-image" class="product-image">
                                    <div class="fslider" data-pagi="false" data-arrows="false" data-thumbs="true">
                                        <div class="flexslider">
                                            <div class="slider-wrap" data-lightbox="gallery">
                                                @if(count($product->images) < 1)
                                                    <div class="slide" data-thumb="{{asset('images/no-image.jpg')}}"><a
                                                            href="{{asset('images/no-image.jpg')}}"
                                                            title="{{$product->name}}"
                                                            data-lightbox="gallery-item"><img
                                                                src="{{asset('images/no-image.jpg')}}"
                                                                alt="{{$product->name}}"></a>
                                                    </div>
                                                @endif
                                                @foreach($product->images as $image)
                                                    <div class="slide"
                                                         data-thumb="{{asset('storage/products/' . $image->image)}}"><a
                                                            href="{{asset('storage/products/' . $image->image)}}"
                                                            title="{{$product->name}}"
                                                            data-lightbox="gallery-item"><img
                                                                src="{{asset('storage/products/' . $image->image)}}"
                                                                alt="{{$product->name}}"></a>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                    @if($product->discount > 0)
                                        <div class="sale-flash badge bg-success p-2">-{{$product->discount}}%</div>
                                    @endif
                                </div><!-- Product Single - Gallery End -->

                            </div>

                            <div class="col-md-5 product-desc">

                                <h1>{{$product->name}}</h1>

                                <div class="d-flex align-items-center justify-content-between">

                                    <!-- Product Single - Price
                                    ============================================= -->
                                    <div class="product-price">
                                        @if($product->discount > 0)
                                            <del>{{$product->getFormattedPrice()}}</del>
                                            <ins>{{$product->getFormattedWithDiscountPrice()}}</ins>
                                        @else
                                            <ins>{{$product->getFormattedPrice()}}</ins>
                                        @endif
                                    </div><!-- Product Single - Price End -->

                                </div>

                                <div class="line"></div>

                                <div class="product-price">
                                    @if($product->measures)
                                        <ins>{{$product->measures}}</ins>
                                    @endif
                                </div><!-- Product Single - Price End -->

                                <div class="line"></div>

                                <!-- Product Single - Quantity & Cart Button
                                ============================================= -->
                                <form class="cart mb-0 d-flex justify-content-between align-items-center" method="post"
                                      enctype='multipart/form-data'>
                                    <div class="quantity">
                                        <input type="button" value="-" class="minus">
                                        <input id="qty" type="number" step="1" min="1" name="quantity" value="1"
                                               title="Cantidad"
                                               class="qty">
                                        <input type="button" value="+" class="plus">
                                    </div>
                                    <button id="add" type="button"
                                            class="add-to-cart button m-0">{{__('Añadir a la cesta')}}</button>
                                </form><!-- Product Single - Quantity & Cart Button End -->

                                <div class="line"></div>

                                <!-- Product Single - Short Description
                                ============================================= -->
                                <p>{{$product->description}}</p>

                            </div>

                            <div class="w-100"></div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section><!-- #content end -->
@endsection

@section('js')
    <script>
        const ID = {{$product->id}};

        TPJ(document).ready(function () {
            TPJ('.add-to-cart').on('click', function () {
                TPJ.ajax({
                    type: 'POST',
                    url: '{!! route('product.get') !!}',
                    data: {id: ID},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            let qty = parseFloat(TPJ('#qty').val());
                            let finalPrice = parseFloat(parseFloat(response.extra.price) - parseFloat(response.extra.price) * parseFloat(response.extra.discount) / parseFloat(100));
                            let cart = TPJ('#top-cart');
                            let imgtodrag = TPJ('.slide').eq(0);
                            let target = TPJ('#product-image');
                            let imgclone;
                            let url = "{{url('/')}}";
                            let items;
                            let indexToModify;

                            initCart();

                            if (storedIDs.includes(response.extra.id)) {
                                items = storedCart.map(jsonString => JSON.parse(jsonString));

                                indexToModify = items.findIndex(item => item.id === response.extra.id);
                                if (indexToModify !== -1) {
                                    items[indexToModify].price += response.extra.price * qty;
                                    items[indexToModify].qty += qty;

                                    items = items.map(obj => JSON.stringify(obj));

                                    storedCart = items;
                                }
                            } else {
                                storedCart.push(`{"id":${response.extra.id},"vat":${response.extra.vat},"item":"${response.extra.name}","url":"${url}/product/view/${response.extra.id}","price": ${finalPrice},"qty":${qty},"img":"${response.extra.images[0].image ? `${url}/storage/products/` + response.extra.images[0].image : '${url}/images/no-image.jpg'}"}`);
                                storedIDs.push(response.extra.id);
                            }

                            total += qty * finalPrice;
                            badget += qty;

                            storeCart();
                            regenerateCart();

                            if (imgtodrag) {
                                imgclone = imgtodrag.clone()
                                    .offset({
                                        top: target.offset().top,
                                        left: target.offset().left
                                    })
                                    .css({
                                        'opacity': '0.5',
                                        'position': 'absolute',
                                        'z-index': '99999'
                                    })
                                    .appendTo(TPJ('body'))
                                    .animate({
                                        'top': cart.offset().top + 10,
                                        'left': cart.offset().left + 10,
                                        'width': 75,
                                        'height': 75
                                    }, 900, 'easeInOutExpo');

                                imgclone.animate({
                                    'width': 0,
                                    'height': 0
                                }, function () {
                                    TPJ(this).detach()
                                });
                            }
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
        });
    </script>

@endsection
