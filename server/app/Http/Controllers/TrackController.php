<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Track;

class TrackController extends Controller
{
    public function index()
    {
        return Track::all();
    }

    public function getById($id)
    {
        return Track::findOrfail($id);
    }

    public function store(Request $request)
    {
        if (
            !$request['name'] ||
            !$request['musician'] ||
            !$request['duration'] ||
            !$request['album_id']
        ) {
            return response()
                ->json([
                    'message' => 'Some parameters are missing!'
                ], 400);
        }

        $trackExists = Track::where([
                'name' => $request['name'],
                'musician' => $request['musician'],
                'duration' => $request['duration'],
                'album_id' => $request['album_id']
            ]
        )->get()->isNotEmpty();

        if ($trackExists) {
            return response()
                ->json([
                    'message' => 'Such track already exists!'
                ], 400);
        }

        return Track::create([
            'name' => $request['name'],
            'musician' => $request['musician'],
            'duration' => $request['duration'],
            'album_id' => $request['album_id']
        ]);
    }

    public function update(Request $request, $id)
    {
        $track = Track::findOrfail($id);
        if ($request['name']) {
            $track->name = $request['name'];
        }
        if ($request['musician']) {
            $track->musician = $request['musician'];
        }
        if ($request['duration']) {
            $track->duration = $request['duration'];
        }
        if ($request['album_id']) {
            $track->musician = $request['album_id'];
        }
        $track->save();
        return response()->json($track, 200);
    }

    public function delete($id)
    {
        $trackWasDeleted = Track::destroy($id);
        return response()->json([
            'existed' => boolval($trackWasDeleted)
        ]);
    }
}
