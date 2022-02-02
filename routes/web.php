<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//Route::get('/{anypath}', 'HomeController@index')->where('path','.*');

Route::get('/category','Admin\CategoryController@index')->name('category.index');
Route::get('/categoryDestroy/{id}','Admin\CategoryController@destroy');
Route::post('/submit-category','Admin\CategoryController@store')->name('category.store');
Route::get('/post','Admin\PostController@index')->name('post.index');
