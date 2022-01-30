/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
// Bootstarp
require('./bootstrap');
// Vue Import
window.Vue = require('vue');

// Vue Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// V-form
import Form from 'vform'
window.Form = Form;



//sweetalart2
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  window.Toast = Toast;

// Toastr Alert

import toastr from 'toastr'
window.toastr = toastr;


// vue x

import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// All Routes
import { routes } from './routes/routes.js';
import Vue from 'vue';
import { Alert } from 'bootstrap';

  const router = new VueRouter({
    routes ,
    mode: "history",
  });

const app = new Vue({
    el: '#content',
    router
});
