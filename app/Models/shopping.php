<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class shopping extends Model
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

    public function shopping_products(): BelongsTo
    {
        return $this->belongsTo(ShoppingProducts::class);

    }

    public static function getAllByUserID()
    {
        return self::where('user_id', Auth()->User()->id)
            ->with('status')
            ->get();
    }
}
