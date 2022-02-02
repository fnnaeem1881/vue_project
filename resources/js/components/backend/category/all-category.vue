<template>
    <div>
        <div class="container-fluid">
           <div class="col-12 pt-3">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">ALl Category</h3>

                <div class="card-tools">
                  <router-link to="/add-category" class="btn btn-info">
                      Add New Category
                  </router-link>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="category in getCategory">
                      <td>{{category.id}}</td>
                      <td>{{category.name}}</td>
                      <td>{{category.slug}}</td>

                      <td><span class="badge" :class="statusColor(category.status)">{{statusName(category.status)}}</span></td>
                      <td>

                            <button type="button" class="btn btn-danger btn-sm">Edit</button>
                            <button type="button" class="btn btn-danger btn-sm" @click="remove(category.id)">Delete</button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>
    </div>
</template>
<script>
    export default {
    name: "categoris",
    mounted(){
        this.$store.dispatch("categoryAll");
    },
    computed: {
        getCategory(){
        return this.$store.getters.categories;
    }
    },
    methods:{
        statusName(status){
            let data = { 0:"Inactive", 1:"Active"}
            return data[status];
        },
         statusColor(status){
            let data = { 0:"bg-danger", 1:"bg-success"}
            return data[status];
        },
        remove(id){
             axios.get("categoryDestroy/" +id)
            .then(function(response){
               toastr.success("Category Has Ben Delated");
                this.$store.dispatch("categoryAll");


            }).catch(function(error){

            })
        }
    }
    }
</script>
