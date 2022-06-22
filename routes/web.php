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
Route::get('/categoryEdit/{id}','Admin\CategoryController@edit')->name('edit.category');
Route::post('/categoryEditStore/{id}','Admin\CategoryController@update')->name('update.category');
Route::post('/submit-category','Admin\CategoryController@store')->name('category.store');
// Post
Route::get('/post','Admin\PostController@index')->name('post.index');
Route::get('/postDestroy/{id}','Admin\PostController@destroy');
Route::get('/postEdit/{id}','Admin\PostController@edit')->name('edit.post');
Route::post('/postEditStore/{id}','Admin\PostController@update')->name('update.post');
Route::post('/submit-post','Admin\PostController@store')->name('post.store');
