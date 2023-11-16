@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <!-- AQUI -->
                <div class="single-product">
                    <div class="product">
                        <div class="row gutter-40">

                            <div class="col-md-5">

                                <!-- Product Single - Gallery
                                ============================================= -->
                                <div class="product-image">
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
                                        <del>$39.99</del>
                                        <ins>$24.99</ins>
                                    </div><!-- Product Single - Price End -->

                                </div>

                                <div class="line"></div>

                                <!-- Product Single - Quantity & Cart Button
                                ============================================= -->
                                <form class="cart mb-0 d-flex justify-content-between align-items-center" method="post"
                                      enctype='multipart/form-data'>
                                    <div class="quantity">
                                        <input type="button" value="-" class="minus">
                                        <input type="number" step="1" min="1" name="quantity" value="1" title="Cantidad"
                                               class="qty">
                                        <input type="button" value="+" class="plus">
                                    </div>
                                    <button type="submit"
                                            class="add-to-cart button m-0">{{__('Añadir a la cesta')}}</button>
                                </form><!-- Product Single - Quantity & Cart Button End -->

                                <div class="line"></div>

                                <!-- Product Single - Short Description
                                ============================================= -->
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero velit id eaque ex
                                    quae laboriosam nulla optio doloribus! Perspiciatis, libero, neque, perferendis at
                                    nisi optio dolor!</p>
                                <p>Perspiciatis ad eveniet ea quasi debitis quos laborum eum reprehenderit eaque
                                    explicabo assumenda rem modi.</p>

                            </div>

                            <div class="w-100"></div>

                        </div>
                    </div>
                </div>
                <!-- ./AQUI -->

            </div>
        </div>
    </section><!-- #content end -->
@endsection

@section('js')

@endsection
