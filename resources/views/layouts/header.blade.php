<!-- Header
		============================================= -->
<header id="header">
    <div id="header-wrap">
        <div class="container">
            <div class="header-row">

                <!-- Logo
                ============================================= -->
                <div id="logo">
                    <a href="/">
                        <img class="logo-default" srcset="images/logo-sports.png, images/logo-sports@2x.png"
                             src="images/logo-sports.png" alt="Sports tienda de ropa logotipo">
                        <img class="logo-dark" srcset="images/logo-sports-dark.png, images/logo-sports-dark.png"
                             src="images/logo-sports-dark.png" alt="Sports tienda de ropa logotipo">
                    </a>
                </div><!-- #logo end -->

                <div class="header-misc">

                    <!-- Top Cart
                    ============================================= -->
                    <div id="top-cart" class="header-misc-icon d-sm-block">
                        <a href="#" id="top-cart-trigger"><i class="uil uil-shopping-bag"></i><span
                                class="top-cart-number">0</span></a>
                        <div class="top-cart-content">
                            <div class="top-cart-title">
                                <h4>Cesta de compra</h4>
                            </div>
                            <div class="top-cart-items">

                            </div>
                            <div class="top-cart-action">
                                <span class="top-checkout-price">0.00€</span>
                                <a href="#" class="button button-3d button-small m-0">Ver cesta</a>
                            </div>
                        </div>
                    </div><!-- #top-cart end -->

                </div>

                <div class="primary-menu-trigger">
                    <button class="cnvs-hamburger" type="button" title="Open Mobile Menu">
                        <span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>
                    </button>
                </div>

                <!-- Primary Navigation
                ============================================= -->
                <nav class="primary-menu">

                    <ul class="menu-container">
                        <li class="menu-item current">
                            <a class="menu-link" href="/">
                                <div>Inicio</div>
                            </a>
                        </li>
                        @guest
                            @if (Route::has('login'))
                                <li class="menu-item ms-auto">
                                    <a class="menu-link" href="{{ route('login') }}"><div><i class="uil uil-user"></i> {{ __('Conectar') }} </div></a>
                                </li>
                            @endif
                        @else
                            <li class="menu-item ms-auto sub-menu">
                                <a class="menu-link" href="#"><div><i class="uil uil-user"></i> {{ Auth::user()->name }} <i class="bi-caret-down-fill text-smaller d-none d-xl-inline-block me-0"></i><i class="sub-menu-indicator fa-solid fa-caret-down"></i></div></a>
                                <ul class="sub-menu-container" style="">
                                    <li class="menu-item" style="">
                                        <a class="menu-link" href="#">
                                            <div>
                                                <i class="uil-cog"></i> {{ __('Mi cuenta') }}
                                            </div>
                                        </a>
                                    </li>
                                    <li class="menu-item" style="">
                                        <a class="menu-link" href="{{ route('logout') }}" onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                            <div>
                                                <i class="uil-lock-slash"></i>{{ __('Desconectar') }}
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <button class="sub-menu-trigger fa-solid fa-chevron-right"><span class="visually-hidden">Open Sub-Menu</span></button>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                      class="d-none">
                                    @csrf
                                </form>
                            </li>
                            {{--<li class="menu-item dropdown">
                                <a id="navbarDropdown" class="menu-link dropdown-toggle" href="#" role="button"
                                   data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="uil uil-user"></i> {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a class="menu-link" href="#">
                                        <i class="uil uil-account"></i> {{ __('Mi cuenta') }}
                                    </a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                        {{ __('Desconectar') }}
                                    </a>


                                </div>
                            </li>--}}

                        @endguest
                    </ul>

                </nav><!-- #primary-menu end -->

            </div>
        </div>
    </div>
    <div class="header-wrap-clone"></div>
</header><!-- #header end -->
