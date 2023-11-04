@if($bc)
    <!-- Page Title
		============================================= -->
    <section class="page-title bg-transparent">
        <div class="container">
            <div class="page-title-row">

                <div class="page-title-content">

                </div>

                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        @foreach($routes as $route)
                            @if(isset($route['redirect']))
                                <li class="breadcrumb-item"><a href="{{$route['redirect']}}">{{$route['name']}}</a></li>
                            @else
                                <li class="breadcrumb-item">{{$route['name']}}</li>
                            @endif
                        @endforeach
                    </ol>
                </nav>

            </div>
        </div>
    </section><!-- .page-title end -->
@endif
