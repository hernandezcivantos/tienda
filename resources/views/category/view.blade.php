@extends('layouts.app')

@section('content')
    <!-- Content
		============================================= -->
    <section id="content">
        <div class="content-wrap">
            <div class="container">
                <!-- Shop
                ============================================= -->
                <div id="shop" class="shop row gutter-30">

                    @foreach($products as $product)
                        <div class="product col-lg-3 col-md-4 col-sm-6 col-12">
                            <div class="grid-inner">
                                <div class="product-image">
                                    @foreach($product->images as $image)
                                        <a href="#"><img src="{{asset('storage/public/products/'.$image->image)}}"
                                                         alt="{{$product->name}}"></a>
                                    @endforeach
                                    <div class="bg-overlay">
                                        <div class="bg-overlay-content align-items-end justify-content-between"
                                             data-hover-animate="fadeIn" data-hover-speed="400">
                                            <a href="#" class="btn btn-dark me-2" title="Add to Cart"><i
                                                    class="bi-bag-plus"></i></a>
                                        </div>
                                        <div class="bg-overlay-bg bg-transparent"></div>
                                    </div>
                                </div>
                                <div class="product-desc">
                                    <div class="product-title"><h3><a
                                                href="{{url('/product/view') . '/' . $product->id}}">{{$product->name}}</a>
                                        </h3></div>
                                    <div class="product-price">
                                        @if($product->discount > 0)
                                            <del>{{$product->getFormattedPrice()}}</del>
                                            <ins>{{$product->getFormattedWithDiscountPrice()}}</ins>
                                        @else
                                            <ins>{{$product->getFormattedPrice()}}</ins>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach

                </div><!-- #shop end -->

            </div>
        </div>
    </section><!-- #content end -->
@endsection



