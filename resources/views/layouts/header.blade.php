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
                        <img class="logo-default" srcset="{{asset('images/logo-sports.png')}}, {{asset('images/logo-sports.png')}}"
                             src="{{asset('images/logo-sports.png')}}" alt="Sports tienda de ropa logotipo">
                        <img class="logo-dark" srcset="{{asset('images/logo-sports-dark.png')}}, {{asset('images/logo-sports-dark.png')}}"
                             src="{{asset('images/logo-sports-dark.png')}}" alt="Sports tienda de ropa logotipo">
                    </a>
                </div><!-- #logo end -->

                @include('layouts.cart')

                <div class="primary-menu-trigger">
                    <button class="cnvs-hamburger" type="button" title="Open Mobile Menu">
                        <span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>
                    </button>
                </div>

                <!-- Primary Navigation
                ============================================= -->
                <nav class="primary-menu">

                    <ul class="menu-container">
                        <li class="menu-item {{ request()->is('/') ? 'current' : '' }}">
                            <a class="menu-link" href="/">
                                <div>Inicio</div>
                            </a>
                        </li>
                        @guest
                            @if (Route::has('login'))
                                <li class="menu-item ms-auto {{ request()->is('login') ? 'current' : '' }}">
                                    <a class="menu-link" href="{{ route('login') }}"><div><i class="uil uil-user"></i> {{ __('Conectar') }} </div></a>
                                </li>
                            @endif
                        @else
                            <li class="menu-item ms-auto sub-menu">
                                <a class="menu-link" href="#"><div><i class="uil uil-user"></i> {{ Auth::user()->name }} <i class="bi-caret-down-fill text-smaller d-none d-xl-inline-block me-0"></i><i class="sub-menu-indicator fa-solid fa-caret-down"></i></div></a>
                                <ul class="sub-menu-container" style="">
                                    <li class="menu-item" style="">
                                        <a class="menu-link" href="{{ route('user.self') }}">
                                            <div>
                                                <i class="uil-cog"></i> {{ __('Mi cuenta') }}
                                            </div>
                                        </a>
                                    </li>
                                    @if(Auth()->user()->isAdmin())
                                    <li class="menu-item" style="">
                                        <a class="menu-link" href="{{ route('admin') }}">
                                            <div>
                                                <i class="uil-user-plus"></i> {{ __('Menu Admin') }}
                                            </div>
                                        </a>
                                    </li>
                                    @endif
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
                        @endguest
                    </ul>

                </nav><!-- #primary-menu end -->

            </div>
        </div>
    </div>
    <div class="header-wrap-clone"></div>
</header><!-- #header end -->
