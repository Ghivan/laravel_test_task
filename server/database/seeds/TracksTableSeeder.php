<?php

use Illuminate\Database\Seeder;
use App\Track;

define('MAX_TRACKS_NUMBER', 50);
define('MAX_WORDS_IN_TRACK_NAME', 3);

class TracksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Track::truncate();

        $faker = \Faker\Factory::create();
        $albumIds = [];
        foreach (DB::table('albums')->select('id')->get() as $albumId) {
            array_push($albumIds, $albumId->id);
        }
        array_push($albumIds, null);
        $albumsIdsLength = count($albumIds);

        for ($i = 0; $i < MAX_TRACKS_NUMBER; $i++) {
            Track::create([
                'name' => $faker->sentence(MAX_WORDS_IN_TRACK_NAME),
                'musician' => $faker->name(),
                'duration' => $faker->time($format = 'i:s'),
                'album_id' => $albumIds[rand(0, $albumsIdsLength - 1)]
            ]);
        }
    }
}
