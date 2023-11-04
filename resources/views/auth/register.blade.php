@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">
                <div class="card mb-0">
                    <div class="card-body" style="padding: 40px;">
                        <form method="POST" id="register-form" name="register-form" class="mb-0" action="{{ route('register') }}"
                              method="POST">
                            @csrf
                            <h3>{{__('Registro de nueva cuenta')}}</h3>
                            <div class="row">
                                <div class="col-12 form-group">
                                    <label for="name">{{__('Nombre')}}:</label>
                                    <input id="name" type="text"
                                           class="form-control @error('name') is-invalid @enderror" name="name"
                                           value="{{ old('name') }}" required autocomplete="name" autofocus>

                                    @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                                <div class="col-12 form-group">
                                    <label for="email">{{__('Correco electrónico')}}:</label>
                                    <input id="email" type="email"
                                           class="form-control @error('email') is-invalid @enderror" name="email"
                                           value="{{ old('email') }}" required autocomplete="email">

                                    @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>

                                <div class="col-12 form-group">
                                    <label for="password">{{__('Contraseña')}}:</label>
                                    <input id="password" type="password"
                                           class="form-control @error('password') is-invalid @enderror" name="password"
                                           required autocomplete="new-password">

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>

                                <div class="col-12 form-group">
                                    <label for="password-confirm">{{__('Repetir contraseña')}}:</label>
                                    <input id="password-confirm" type="password" class="form-control"
                                           name="password_confirmation" required autocomplete="new-password">
                                </div>

                                <div class="col-12 form-group">
                                    <div class="d-flex justify-content-between">
                                        <button class="button button-3d button-black m-0" id="register-form-submit"
                                                name="login-form-submit" value="login">{{__('Registrar')}}
                                        </button>
                                        <div class="d-flex justify-content-between">
                                            @if (Route::has('login'))
                                                <a class="btn btn-link" href="{{ route('login') }}">
                                                    {{ __('Conectar cuenta') }}
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
