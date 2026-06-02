<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SportFee extends Model
{
    protected $fillable = ['sport_id', 'label', 'amount'];

    protected $casts = ['amount' => 'integer'];

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class, 'sport_id', 'sport_id');
    }
}
