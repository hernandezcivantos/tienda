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

                <div class="product col-lg-3 col-md-4 col-sm-6 col-12">
                    <div class="grid-inner">
                        <div class="product-image">
                            <a href="#"><img src="images/shop/dress/1.jpg" alt="Checked Short Dress"></a>
                            <a href="#"><img src="images/shop/dress/1-1.jpg" alt="Checked Short Dress"></a>
                            <div class="sale-flash badge bg-secondary p-2">Out of Stock</div>
                            <div class="bg-overlay">
                                <div class="bg-overlay-content align-items-end justify-content-between" data-hover-animate="fadeIn" data-hover-speed="400">
                                    <a href="#" class="btn btn-dark me-2" title="Add to Cart"><i class="bi-bag-plus"></i></a>
                                    <a href="include/ajax/shop-item.html" class="btn btn-dark" data-lightbox="ajax" title="Quick View"><i class="bi-eye"></i></a>
                                </div>
                                <div class="bg-overlay-bg bg-transparent"></div>
                            </div>
                        </div>
                        <div class="product-desc">
                            <div class="product-title"><h3><a href="#">Checked Short Dress</a></h3></div>
                            <div class="product-price"><del>$24.99</del> <ins>$12.49</ins></div>
                            <div class="product-rating">
                                <i class="bi-star-fill"></i>
                                <i class="bi-star-fill"></i>
                                <i class="bi-star-fill"></i>
                                <i class="bi-star-fill"></i>
                                <i class="bi-star-half"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div><!-- #shop end -->

        </div>
    </div>
</section><!-- #content end -->
@endsection



