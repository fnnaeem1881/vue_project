<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker =Faker\Factory::create();
        foreach(range(1,50) as $index){
            $category = $faker->unique()->name();
            Category::create([
                "name"      => $category,
                "slug"      => $this->slugify($category),
                "status"    => rand(0,1),
            ]);
        }
    }
    public function slugify($text){
        $text = preg_replace('~[^\pL\d]+~u', '_', $text);

        if(empty($text)){
            return 'n-a';
        }
        return $text;
    }
}
