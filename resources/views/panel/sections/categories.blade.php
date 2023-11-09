<div class="tab-pane fade show active" id="v-pills-categories" role="tabpanel" aria-labelledby="v-pills-categories-tab" tabindex="0">

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
            <th>Nombre</th>
            <th>Estado</th>
            <th></th>
        </tr>
        </thead>
        <tbody id="categoriesBody">
        @foreach($categories as $category)
            <tr id="categoryRow{{$category->id}}">
                <td>{{$category->id}}</td>
                <td>
                    {{$category->name}}
                </td>
                <td>{{$category->active ? 'Activa' : 'Inactiva'}}</td>
                <td><a class="categoryEditLink" data-id="{{$category->id}}" href="#"><i class="uil-edit"
                                                                                        style="font-size: 18px"></i></a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
