<template>
  <div>
    <div class="container-fluid">
      <div class="col-12 pt-3">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">ALl Post</h3>

            <div class="card-tools">
              <router-link to="/add-post" class="btn btn-info">
                Add New Post
              </router-link>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="post in getPost">
                  <td>{{ post.id }}</td>
                  <td>{{ post.title }}</td>
                  <td>{{ post.content }}</td>
                  <td><img :src=" post.thumbaile" width="100px" alt=""></td>

                  <td>
                    <span class="badge" :class="statusColor(post.status)">{{
                      statusName(post.status)
                    }}</span>
                  </td>
                  <td>
                    <router-link
                      :to="`/edit-post/${post.id}`"
                      @click="edit(post.id)"
                      class="text-light btn btn-danger btn-sm"
                      >Edit</router-link
                    >

                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="remove(post.id)"
                    >
                      Delete
                    </button>
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
  name: "post",
   mounted() {
    this.$store.dispatch("PostGet");
  },
  computed: {
    getPost() {
      return this.$store.getters.post;
    },
  },
  methods: {
    statusName(status) {
      let data = { 0: "Inactive", 1: "Active" };
      return data[status];
    },
    statusColor(status) {
      let data = { 0: "bg-danger", 1: "bg-success" };
      return data[status];
    },
    remove(id) {
      let test = this;

      Vue.swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .get("postDestroy/" + id)
              .then(function (response) {
                test.$store.dispatch("PostGet");
                //    toastr.success("Category Has Ben Delated");
              })
              .catch(function (error) {
               Vue.swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                })
              });
            Vue.swal.fire("Deleted!", "Your file has been deleted.", "success");
          } else {
           Vue.swal.fire({
                icon: 'error',
                title: 'Cancelled',
                text: 'Your imaginary file is safe :)',
                })
          }
        });
    },
    emtyData() {
      return this.getPost.length < 1;
    },
  },
};
</script>
