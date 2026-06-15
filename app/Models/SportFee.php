<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SportFee extends Model
{
    protected $fillable = ['sport_id', 'label', 'amount', 'quantity_enabled', 'max_quantity'];

    protected $casts = ['amount' => 'integer', 'quantity_enabled' => 'boolean',
        'max_quantity' => 'integer', ];

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class, 'sport_id', 'sport_id');
    }
}
