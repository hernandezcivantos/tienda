@extends('layouts.app')

@section('content')
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="tab-pane fade show active" id="v-pills-categories" role="tabpanel"
                     aria-labelledby="v-pills-categories-tab" tabindex="0">

                    <div class="row">
                        <div class="col-12 table-top-button">
                            <a id="newUserButton" href="#" class="button"><i
                                    class="uil-plus"></i>{{__('Nuevo usuario')}}</a>
                        </div>
                    </div>

                    <table id="usersTable" class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{{__('Nombre')}}</th>
                            <th>{{__('Correo')}}</th>
                            <th>{{__('Rol')}}</th>
                            <th>{{__('Estado')}}</th>
                            <th>{{__('Acciones')}}</th>
                        </tr>
                        </thead>
                    </table>
                </div>


            </div>

        </div>
    </section><!-- #content end -->
@endsection

@section('modals')
    <!-- Users modals -->
    <!-- ADD -->
    <form id="userForm">
        <div id="userModal" class="modal fade text-start" tabindex="-1" role="dialog"
             aria-labelledby="userModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="modalLabel"></h4>
                        <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                                aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="userName">{{__('Nombre')}}</label>
                            <input id="userName" name="name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="userEmail">{{__('Correo electrónico')}}</label>
                            <input id="userEmail" name="email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="userPassword">{{__('Contraseña')}}</label>
                            <input id="userPassword" name="password" type="text" class="form-control">
                            <small id="passwordWarning" class="form-text text-muted">{{__('* Solo rellenar si se quiere cambiar')}}</small>
                        </div>
                        <div class="form-group">
                            <label for="userRol">{{__('Rol')}}</label>
                            <select id="userRol" name="access_level" class="form-select">
                                <option value="" selected>{{__('Selecciona un rol')}}</option>
                                <option value="1">{{__('Administrador')}}</option>
                                <option value="2">{{__('Cliente')}}</option>
                            </select>
                        </div>
                        <input type="hidden" id="userID" name="id">
                    </div>
                    <div class="modal-footer">
                        <input id="userActive" class="bt-switch" type="checkbox" checked data-on-text="Activo"
                               data-off-text="Inactivo" data-on-color="themecolor" data-off-color="danger">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                        <button id="userButtonForm" type="submit"
                                class="btn btn-green"></button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- ./ADD -->

    <!-- USUARIO DELETE -->
    <div id="userDeleteModal" class="modal fade text-start bs-example-modal-centered" tabindex="-1"
         role="dialog" aria-labelledby="centerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('ELIMINAR CATEGORIA')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal"
                            aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <p>{{__('Estás a punto de ELIMINAR esta categoría. ¿Es correcto?')}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="userDeleteModalButton" type="button"
                            class="btn btn-danger">{{__('Eliminar')}}</button>
                </div>
            </div>
        </div>
    </div><!-- ./DELETE -->
@endsection

@section('js')
    <script>
        $(document).ready(function () {

            const MODAL_LABEL = $('#modalLabel');

            let modalMode;
            let userDeleteId;

            let usersTable = new DataTable('#usersTable', {
                ajax: {
                    url: '{{route('admin.users.all')}}',
                },
                columns: [
                    {data: 'id'},
                    {data: 'name'},
                    {data: 'email'},
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return data.access_level === 1 || data.access_level === '1'? 'Admin' : 'Cliente';
                        }
                    },
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return data.active === 1 || data.active === '1' ? 'Activo' : 'Inactivo';
                        }
                    },
                    {
                        data: null,
                        bSortable: false,
                        mRender: function (data) {
                            return `<a class="userEditLink" data-id="${data.id}" href="#">
                                        <i class="uil-edit" style="font-size: 18px"></i>
                                    </a>
                                    <a class="userEditLink" data-id="${data.id}" href="#">
                                        <i class="uil-trash" style="font-size: 18px"></i>
                                    </a>
                                    `;
                        }
                    },
                ],
                language: {
                    url: '{{asset('js/sp.json')}}'
                }
            });

            function wipeForm(mode) {
                $('#userName').val('');
                $('#userEmail').val('');
                $('#userPassword').val('');
                $('#userRol').prop('selectedIndex',0);

                modalMode = mode;

                if (modalMode === 1) {
                    $('#userButtonForm').html('{{__('Crear usuario')}}');
                    $('#userActive').prop('checked', false).change();
                    $('#passwordWarning').not('.hidden').hide();
                } else if (modalMode === 2) {
                    $('#userButtonForm').html('{{__('Editar usuario')}}');
                    if(!$('#passwordWarning').hasClass('hidden')) {
                        $('#passwordWarning').show();
                    }
                }
            }

            $('#newUserButton').on('click', function () {
                MODAL_LABEL.html('');
                MODAL_LABEL.append('{{__('Crear usuario')}}');
                wipeForm(1);
                $('#userModal').modal('show');
            });

            $('#userForm').submit(function (e) {
                e.preventDefault();

                displayLoader();

                let data = new FormData(this);

                data.append('active', $('#userActive').prop('checked') ? 1 : 0)

                if (modalMode === 1) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('user.store') !!}',
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response.success === 1) {
                                usersTable.row.add(response.extra).draw();
                                $('#userModal').modal('hide');
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
                } else if (modalMode === 2) {
                    $.ajax({
                        type: 'POST',
                        url: '{!! route('user.updateForm') !!}',
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            if (response.success === 1) {
                                usersTable.ajax.reload();
                                $('#userModal').modal('hide');
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
                }
            });

            $(document.body).on('click', '.userEditLink', function () {
                let id = $(this).data('id');

                MODAL_LABEL.html('');
                MODAL_LABEL.append('{{__('Editar usuario')}}');
                wipeForm(2);
                $('#userID').val(id);

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('user.get') !!}',
                    data: {id: id},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            $('#userName').val(response.extra.name);
                            $('#userEmail').val(response.extra.email);
                            $('#userRol').prop('selectedIndex',response.extra.access_level);
                            $('#userActive').prop('checked', response.extra.active === 1 || response.extra.active === '1').change();
                            $('#userModal').modal('show');
                        }
                    },
                    error: function (error) {
                        toastMessage(error.message, 5000, 0);
                    },
                    complete: function (e) {
                        hideLoader();
                    }
                });
            });

            $(document.body).on('click', '.userDeleteLink', function (e) {

                let id = e.currentTarget.dataset.id;

                userDeleteId = id;

                $('#userDeleteModalButton').attr('data-id', id);
                $('#userDeleteModal').modal('show');
            });

            $(document.body).on('click', '#userDeleteModalButton', function () {
                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('user.delete') !!}',
                    data: {id: userDeleteId},
                    cache: false,
                    success: function (response) {
                        if (response.success === 1) {
                            $('#userDeleteModal').modal('hide');
                            usersTable.ajax.reload();
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

            $(".bt-switch").bootstrapSwitch();
        });
    </script>
@endsection
