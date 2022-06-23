import home from '../components/backend/home.vue';
import categoris from '../components/backend/category/all-category.vue';
import addCategory from '../components/backend/category/add-category.vue';
import editCategory from '../components/backend/category/edit-category.vue';

// Post
import post from '../components/backend/post/all-post.vue';
import addPost from '../components/backend/post/add-post.vue';
import editPost from '../components/backend/post/edit-post.vue';
import notFound from '../components/not-found.vue';

export const routes = [
    { path: '/home', component: home },
    { path: '/categoris', component: categoris },
    { path: '/add-category', component: addCategory },
    { path: '/edit-category/:id', component: editCategory },
    { path: '/post', component: post },
    { path: '/add-post', component: addPost },
    { path: '/edit-post/:id', component: editPost },
    {path: '/:catchAll(.*)', component: notFound},

  ];
