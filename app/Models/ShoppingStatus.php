<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShoppingStatus extends Model
{
    use HasFactory;

    protected $table = 'shopping_statuses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    public function shopping(): BelongsTo
    {
        return $this->belongsTo(Shopping::class);
    }
}
