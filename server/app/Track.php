<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = ['name', 'year'];
    protected $visible = ['id', 'name', 'musician', 'duration', 'album_id'];
}
