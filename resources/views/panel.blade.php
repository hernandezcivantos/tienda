@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div id="side-navigation" class="row">

                    <div class="col-md-6 col-lg-4">

                        <div class="nav flex-column align-items-start text-start list-group" id="v-pills-tab" role="tablist" aria-orientation="vertical" style="--bs-list-group-active-bg: var(--cnvs-themecolor); --bs-list-group-active-border-color: var(--cnvs-themecolor);">
                            <button class="list-group-item w-100 d-flex active" id="v-pills-categories-tab" data-bs-toggle="pill" data-bs-target="#v-pills-categories" type="button" role="tab" aria-controls="v-pills-categories" aria-selected="true"><i class="me-2 bi-display"></i>{{__('Categorías')}}<i class="fa-solid fa-chevron-right ms-auto"></i></button>
                            <button class="list-group-item w-100 d-flex" id="v-pills-products-tab" data-bs-toggle="pill" data-bs-target="#v-pills-products" type="button" role="tab" aria-controls="v-pills-products" aria-selected="true"><i class="me-2 bi-backpack2"></i>{{__('Productos')}}<i class="fa-solid fa-chevron-right ms-auto"></i></button>
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
