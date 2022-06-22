import home from '../components/backend/home.vue';
import categoris from '../components/backend/category/all-category.vue';
import addCategory from '../components/backend/category/add-category.vue';
import editCategory from '../components/backend/category/edit-category.vue';


export const routes = [
    { path: '/home', component: home },
    { path: '/categoris', component: categoris },
    { path: '/add-category', component: addCategory },
    { path: '/edit-category/:id', component: editCategory },

  ];
