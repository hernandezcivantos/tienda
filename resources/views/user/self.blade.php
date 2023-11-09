@extends('layouts.app')

@section('content')
    <!-- Content
		============================================= -->
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="row gx-5">

                    <div class="col-md-9">

                        <div class="heading-block border-0">
                            <h3>
                                <span id="username">
                                    {{Auth()->user()->name}}
                                </span>
                                <a href="#" id="userDataButton" class="pointer-event"><i class="bi-pencil"
                                                                                         style="font-size: 20px"></i></a>
                            </h3>
                            <span id="useremail">{{Auth()->user()->email}}</span>
                        </div>

                        <div class="row">

                            <div class="col-lg-12">

                                <h5>Histórico de compras</h5>

                                <div>
                                    @if(count($shoppings) > 0)
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            @foreach($shoppings as $shopping)
                                                <tr class="pointer"
                                                    data-href="{{url('/') . '/purchase/view/' . $shopping->id}}">
                                                    <td>{{$shopping->id}}</td>
                                                    <td>
                                                        <code>{{$shopping->date->format('d/m/Y h:i:s')}}</code>
                                                    </td>
                                                    <td>{{$shopping->status->name}}</td>
                                                </tr>
                                            @endforeach
                                            </tbody>
                                        </table>
                                    @else
                                        <p>No tienes compras actualmente.</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-100 line d-block d-md-none"></div>

                </div>

            </div>
        </div>
    </section><!-- #content end -->
@endsection

@section('modals')
    <!-- User modals -->
    <!-- User Data edit -->
    <div id="userDataModal" class="modal fade text-start" tabindex="-1" role="dialog"
         aria-labelledby="userDataModalLabel" aria-hidden="true">
        <form id="userEdit" autocomplete="false">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">{{__('Modificar datos')}}</h4>
                        <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                                aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="email">Correo electrónico</label>
                            <input type="email" id="email" class="form-control" value="{{Auth()->user()->email}}"
                                   disabled>
                            <small
                                class="form-text text-muted">{{__('No se puede modificar el correo electrónico.')}}</small>
                        </div>
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" name="name" class="form-control"
                                   value="{{Auth()->user()->name}}">
                        </div>
                        <div class="divider divider-rounded divider-center"><i class="bi-geo-alt-fill"></i></div>
                        <div class="form-group">
                            <label for="address">Dirección entrega</label>
                            <textarea class="form-control" id="address" name="address"
                                      rows="3">{{Auth()->user()->address}}</textarea>
                        </div>
                        {{--<div class="divider divider-rounded divider-center"><i class="fa-solid fa-lock"></i></div>
                        <div class="form-group">
                            <label for="pass">{{__('Contraseña')}}</label>
                            <input type="password" id="pass" name="pass" class="form-control"
                                   placeholder="Contraseña" autocomplete="nofill" value="">
                        </div>
                        <div class="form-group">
                            <label for="repass">{{__('Repetir contraseña')}}</label>
                            <input type="password" id="repass" name="repass" class="form-control"
                                   placeholder="Repetir contraseña" autocomplete="false" value="">
                        </div>--}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-green">Guardar cambios</button>
                    </div>
                </div>
            </div>
        </form>
    </div> <!-- ./User Data edit -->
@endsection

@section('js')
    <script>
        $(document).ready(function () {
            $('#userDataButton').on('click', function () {
                $('#userDataModal').modal('show');
            });

            $('#userEdit').submit(function (e) {
                e.preventDefault();

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('user.update') !!}',
                    data: $('#userEdit').serialize(),
                    dataType: 'json',
                    success: function (response) {
                        if (response.success === 1) {
                            $('#username').text($('#name').val());
                            $('#userDataModal').modal('hide');
                        }
                        toastMessage(response.message, 5000, response.success);
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

        $('table tr').on('click', function () {
            window.location = $(this).data('href');
            return false;
        });

    </script>
@endsection
