<?php

use Illuminate\Database\Seeder;
use App\Album;

define('MAX_ALBUMS_NUMBER', 25);
define('MAX_WORDS_IN_ALBUM_NAME', 3);

class AlbumsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < MAX_ALBUMS_NUMBER; $i++) {
            Album::create([
                'name' => $faker->sentence(MAX_WORDS_IN_ALBUM_NAME),
                'year' => $faker->year(),
            ]);
        }
    }
}
