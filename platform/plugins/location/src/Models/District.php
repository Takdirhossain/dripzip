<?php

namespace Botble\Location\Models;

use Botble\Base\Casts\SafeContent;
use Botble\Base\Enums\BaseStatusEnum;
use Botble\Base\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends BaseModel
{
    protected $table = 'districts';

    protected $fillable = [
        'name',
        'slug',
    ];


    protected static function booted(): void
    {
        static::deleted(function (District $district): void {
            $district->states()->delete();
            $district->cities()->delete();
        });
    }


}
