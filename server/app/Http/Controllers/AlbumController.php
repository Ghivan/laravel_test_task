<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Album;


class AlbumController extends Controller
{
    public function index()
    {
        return Album::all();
    }

    public function getById($id)
    {
        return Album::findOrfail($id);
    }

    public function store(Request $request)
    {
        if (!$request['name'] || !$request['year']) {
            return response('Some parameters are missing!', 400);
        }

        $albumExists = Album::where([
                'name' => $request['name'],
                'year' => $request['year']
            ]
        )->get()->isNotEmpty();

        if ($albumExists) {
            return response('Such album already exists!', 400);
        }

        return Album::create([
            'name' => $request['name'],
            'year' => $request['year']
        ]);
    }

    public function update(Request $request, $id)
    {
        $album = Album::findOrfail($id);
        if ($request['name']) {
            $album->name = $request['name'];
        }
        if ($request['year']) {
            $album->year = $request['year'];
        }
        $album->save();
        return response()->json($album, 200);
    }

    public function delete($id)
    {
        $albumWasDeleted = Album::destroy($id);
        return response()->json([
            'existed' => boolval($albumWasDeleted)
        ]);
    }
}
