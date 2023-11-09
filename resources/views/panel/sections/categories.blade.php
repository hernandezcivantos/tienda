<div class="col-md-6 col-lg-8">
    <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel"
             aria-labelledby="v-pills-home-tab" tabindex="0">

            <div class="row">
                <div class="col-12 table-top-button">
                    <a id="newCategoryButton" href="#" class="button"><i
                            class="uil-plus"></i>{{__('Nueva categoría')}}</a>
                </div>
            </div>

            <table id="categoriesTable" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="categoriesBody">
                @foreach($categories as $category)
                    <tr>
                        <td>{{$category->id}}</td>
                        <td>
                            {{$category->name}}
                        </td>
                        <td>{{$category->active ? 'Activa' : 'Inactiva'}}</td>
                        <td><a href="#"><i class="uil-edit" style="font-size: 18px"></i></a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <div id="toScroll"></div>
        </div>
    </div>
</div>

@section('modals')
    <!-- Categories modals -->
    <!-- ADD -->
    <div id="newCategoryModal" class="modal fade text-start" tabindex="-1" role="dialog"
         aria-labelledby="newCategoryModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">{{__('Añadir nueva categoría')}}</h4>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="categoryName">{{__('Nombre de la categoría')}}</label>
                        <input id="categoryName" name="name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="categoryRoute">{{__('Ruta de la categoría')}}</label>
                        <input id="categoryRoute" type="text" class="form-control" disabled>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{__('Cerrar')}}</button>
                    <button id="newCategoryModalButton" type="button" class="btn btn-green">{{__('Crear categoría')}}</button>
                </div>
            </div>
        </div>
    </div> <!-- ./ADD -->
@endsection

@section('js')
    <script>
        $(document).ready(function () {
            $('#newCategoryButton').on('click', function () {
                $('#newCategoryModal').modal('show');
            });

            document.getElementById('categoryName').addEventListener("input", function(){
                document.getElementById("categoryRoute").value = friendlyUrl(this.value)
            });

            $('#newCategoryModalButton').on('click', function (e) {
                e.preventDefault();

                let data = {
                    name: $('#categoryName').val(),
                    route: friendlyUrl($('#categoryName').val())
                };

                displayLoader();

                $.ajax({
                    type: 'POST',
                    url: '{!! route('category.store') !!}',
                    data: data,
                    dataType: 'json',
                    success: function (response) {
                        console.log(response)
                        if (response.success === 1) {
                            $('#username').text($('#name').val());
                            $('#newCategoryModal').modal('hide');
                            $('#categoriesBody').append(`<tr><td>${response.extra.id}</td><td>${response.extra.name}</td><td>Activa</td><td><a href="#"><i class="uil-edit" style="font-size: 18px"></i></a></td></tr>`)
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
    </script>
@endsection
