<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Yajra\DataTables\Exceptions\Exception;

class DatatablesController extends Controller
{
    /**
     * @throws Exception
     * @throws \Exception
     */
    public function products(): JsonResponse
    {
        $products = Product::with('category')
            ->get();

        return datatables()->of($products)->toJson();
    }
}
