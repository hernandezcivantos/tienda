<div class="tab-pane fade" id="v-pills-products" role="tabpanel" aria-labelledby="v-pills-products-tab" tabindex="0">

    <div class="row">
        <div class="col-12 table-top-button">
            <a id="newProductButton" href="#" class="button"><i
                    class="uil-plus"></i>{{__('Nuevo producto')}}</a>
        </div>
    </div>

    <table id="productsTable" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
        </tr>
        </thead>
        <tbody id="productsBody">
        @foreach($products as $product)
            <tr id="categoryRow{{$product->id}}">
                <td>{{$product->id}}</td>
                <td>{{$product->name}} </td>
                <td>{{$product->category->name}}</td>
                <td>{{$product->price}}</td>
                <td>
                    <a class="productEditLink" data-id="{{$product->id}}" href="#">
                        <i class="uil-edit" style="font-size: 18px"></i>
                    </a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
