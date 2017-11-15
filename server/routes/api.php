<?php

Route::get('albums', 'AlbumController@index');
Route::get('albums/{id}', 'AlbumController@getById');
Route::post('albums', 'AlbumController@store');
Route::put('albums/{id}','AlbumController@update');
Route::delete('albums/{id}', 'AlbumController@delete');

Route::get('tracks', 'TrackController@index');
Route::get('tracks/{id}', 'TrackController@getById');
Route::post('tracks', 'TrackController@store');
Route::put('tracks/{id}','TrackController@update');
Route::delete('tracks/{id}', 'TrackController@delete');
