<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $fillable = ['name', 'year'];
    protected $visible = ['id', 'name', 'year'];
}
