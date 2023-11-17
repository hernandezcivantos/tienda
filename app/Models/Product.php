<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use NumberFormatter;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'price',
        'weight',
        'measures',
        'description',
        'discount',
        'vat'
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getFormattedPrice()
    {
        $formatter = new NumberFormatter('de_DE', NumberFormatter::CURRENCY);
        return $formatter->formatCurrency($this->price, 'EUR');
    }

    public function getFormattedWithDiscountPrice()
    {
        if($this->discount > 0)
        {
            $formatter = new NumberFormatter('de_DE', NumberFormatter::CURRENCY);
            return $formatter->formatCurrency($this->price - $this->price * $this->discount / 100, 'EUR');
        }

        return $this->getFormattedPrice();
    }
}
