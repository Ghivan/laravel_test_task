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

        for ($i = 0; $i < MAX_TRACKS_NUMBER; $i++) {
            $albumId = DB::table('albums')->inRandomOrder()->first()->id;
            Track::create([
                'name' => $faker->sentence(MAX_WORDS_IN_TRACK_NAME),
                'musician' => $faker->name(),
                'duration' => $faker->time($format = 'i:s'),
                'album_id' => $albumId
            ]);
        }
    }
}
