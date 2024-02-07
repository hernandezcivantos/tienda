<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use NumberFormatter;

class Shopping extends Model
{
    use HasFactory;

    protected $table = 'shoppings';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'status_id',
        'date'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'datetime',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function status()
    {
        return $this->belongsTo(ShoppingStatus::class);
    }

    public function shoppingProducts(): HasMany
    {
        return $this->hasMany(ShoppingProducts::class);
    }

    public function getTotals(): array
    {
        $formatter = new NumberFormatter('de_DE', NumberFormatter::CURRENCY);

        $return = [
            'sub' => 0,
            'vat' => 0,
            'total' => 0
        ];

        foreach($this->shoppingProducts as $item)
        {
            $return['total'] += $item->price * $item->qty;
            $return['vat'] +=  $return['total'] * $item->product->vat / 100;
        }

        $return['sub'] = $return['total'] - $return['vat'];

        return [
            'sub' => $formatter->formatCurrency($return['sub'], 'EUR'),
            'vat' => $formatter->formatCurrency($return['vat'], 'EUR'),
            'total' => $formatter->formatCurrency($return['total'], 'EUR')
        ];
    }

    public function getProducts()
    {
        $formatter = new NumberFormatter('de_DE', NumberFormatter::CURRENCY);

        return $this->shoppingProducts->map(function ($item) use($formatter) {
            return [
                'name' => $item->product->name,
                'price' => $formatter->formatCurrency($item->price, 'EUR'),
                'qty' => $item->qty,
                'total' => $formatter->formatCurrency($item->price * $item->qty, 'EUR')
            ];
        });
    }

    public static function getAllByUserID()
    {
        return self::where('user_id', Auth()->User()->id)
            ->with('status')
            ->get();
    }

    public static function storeShopping($data): JsonResponse
    {
        try {
            DB::beginTransaction();

            $shopping = new Shopping();
            $shopping->user_id = Auth::user()->id;
            $shopping->status_id = 1;
            $shopping->date = now();

            $shopping->save();

            foreach($data as $item)
            {
                $shoppingProduct = new ShoppingProducts();
                $shoppingProduct->shopping_id = $shopping->id;
                $shoppingProduct->product_id = $item->id;
                $shoppingProduct->qty = $item->qty;
                $shoppingProduct->price = $item->price;

                $shoppingProduct->save();
            }
            DB::commit();

            $response = [
                'success' => 1,
                'message' => __('Compra realizada con éxito.'),
            ];

            return response()->json($response);
        } catch (Exception $exception) {
            $response = [
                'success' => 0,
                'message' => __('Ha habido algún problema con la compra.'),
            ];

            DB::rollBack();

            return response()->json($response);
        }
    }
}
