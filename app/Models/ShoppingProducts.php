<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShoppingProducts extends Model
{
    use HasFactory;

    protected $table = 'shopping_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'shopping_id',
        'product_id'
    ];

    public function shopping(): HasMany
    {
        return $this->hasMany(Shopping::class);
    }

    public function product(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
