<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    protected $fillable = ['name', 'musician', 'duration', 'album_id'];
    protected $visible = ['id', 'name', 'musician', 'duration', 'album_id'];
}
