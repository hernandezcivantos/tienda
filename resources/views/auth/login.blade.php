@extends('layouts.app')

@section('content')
    <!-- Content
   ============================================= -->
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="card mb-0">
                    <div class="card-body" style="padding: 40px;">
                        <form id="login-form" name="login-form" class="mb-0" action="{{ route('login') }}" method="POST">
                            @csrf
                            <h3>{{__('Conectar a tu cuenta')}}</h3>

                            <div class="row">
                                <div class="col-12 form-group">
                                    <label for="login-form-username">{{__('Correco electrónico')}}:</label>
                                    <input id="email" type="email"
                                           class="form-control @error('email') is-invalid @enderror" name="email"
                                           value="{{ old('email') }}" required autocomplete="email" autofocus>

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                         <strong>{{ $message }}</strong>
                                     </span>
                                    @enderror
                                </div>

                                <div class="col-12 form-group">
                                    <label for="login-form-password">{{__('Contraseña')}}:</label>
                                    <input id="password" type="password"
                                           class="form-control @error('password') is-invalid @enderror" name="password"
                                           required autocomplete="current-password">

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                         <strong>{{ $message }}</strong>
                                     </span>
                                    @enderror
                                </div>

                                <div class="col-12 form-group">
                                    <div class="d-flex justify-content-between">
                                        <button class="button button-3d button-black m-0" id="login-form-submit"
                                                name="login-form-submit" value="login">{{__('Conectar')}}
                                        </button>
                                        <div class="d-flex justify-content-between">
                                            @if (Route::has('register'))
                                                <a class="btn btn-link" href="{{ route('register') }}">
                                                    {{ __('Crear cuenta') }}
                                                </a>
                                            @endif
                                            @if (Route::has('password.request'))
                                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                                    {{ __('Contraseña olvidada') }}
                                                </a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    </section><!-- #content end -->
@endsection
