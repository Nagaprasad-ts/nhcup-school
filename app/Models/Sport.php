<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sport extends Model
{
    protected $fillable = [
        'sport_id', 'name', 'icon', 'badge', 'teams',
        'categories', 'genders', 'player_type', 'max_players',
        'pdf_entry', 'pdf_rules', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'categories' => 'array',
        'genders' => 'array',
        'max_players' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function fees(): HasMany
    {
        return $this->hasMany(SportFee::class, 'sport_id', 'sport_id');
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class, 'sport_id', 'sport_id');
    }
}
