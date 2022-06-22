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

                           <router-link :to="`/edit-category/${category.id}`" @click="edit(category.id)" class="text-light btn btn-danger btn-sm">Edit</router-link>

                            <button type="button" class="btn btn-danger btn-sm" @click="remove(category.id)">Delete</button>
                      </td>
                    </tr>
                    <tr v-if="emtyData()">
                        <td colspan="10">
                            <h5 class="text-center text-danger">Data Not Found</h5>
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
              let test = this;
             axios.get("categoryDestroy/" +id)
            .then(function(response){

                test.$store.dispatch("categoryAll");
               toastr.success("Category Has Ben Delated");



            }).catch(function(error){
                toastr.error("Category not Delated");
            })
        },
        emtyData(){
            return (this.getCategory.length <1);
        },
    }
    }
</script>
