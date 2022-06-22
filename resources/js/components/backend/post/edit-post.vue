<template>
  <div>
    <div class="container-fluid">
      <div class="col-6 pt-3 offset-3">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Add New Post</h3>

            <div class="card-tools">
              <router-link to="/post" class="btn btn-info">
                ALl Post
              </router-link>
            </div>
          </div>
          <!-- /.card-header -->
          <form @submit.prevent="addPost" enctype="multipart/form-data">
            <div class="card-body">
              <div class="form-group">
                <label for="title">Post Title</label>
                <input
                  type="text"
                  v-model="form.title"
                  class="form-control"
                  id="title"
                  placeholder="Enter Post Title"
                />
                <div
                  class="text-danger"
                  v-if="form.errors.has('title')"
                  v-html="form.errors.get('title')"
                />
              </div>
              <div class="form-group">
                <label for="category">Post Category</label>
                <!-- <input
                                    type="text"
                                    v-model="form.category"
                                    class="form-control"
                                    id="category"
                                    placeholder="Enter Post category"
                                /> -->
                <select
                  v-model="form.category_id"
                  class="form-control"
                  id="category_id"
                >
                  <option v-for="category in getCategory" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
                <div
                  class="text-danger"
                  v-if="form.errors.has('category')"
                  v-html="form.errors.get('category')"
                />
              </div>
              <div class="form-group">
                <label for="content">Post Content</label>
                <textarea
                  v-model="form.content"
                  class="form-control"
                  id="content"
                  placeholder="Enter Post Content"
                >
                </textarea>
                <div
                  class="text-danger"
                  v-if="form.errors.has('content')"
                  v-html="form.errors.get('content')"
                />
              </div>
              <div class="form-group">
                <label for="thumbaile">Post thumbaile</label>
                <input
                  type="file" id="thumbaile"
                  class="form-control"
                  @change="upload_avatar"
                  style="padding: 0; line-height: 29px"
                  placeholder="Enter Post thumbaile"
                  name="avatar"
                />
                <div
                  class="text-danger"
                  v-if="form.errors.has('thumbaile')"
                  v-html="form.errors.get('thumbaile')"
                />
                <div
                  class="avatar img-fluid img-circle"
                  v-if="get_avatar"
                  style="margin-top: 10px"
                >
                  <img width="100px"  v-if="form.avatar" :src="get_avatar()" />
                  <img width="100px" v-else :src="form.thumbaile" />
                </div>
              </div>

              <!-- <div class="form-group">
                      <label for="slug">Category Slug</label>
                      <input type="text" class="form-control" id="slug" placeholder="Enter Category Slug">
                  </div> -->
              <div class="form-check form-check-inline">
                <label class="form-check-label" for="status">Status</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  v-model="form.status"
                  class="form-check-input"
                  id="status"
                  value="1"
                />

                <label class="form-check-label" for="status">Active</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  v-model="form.status"
                  class="form-check-input"
                  id="instatus"
                  value="0"
                />
                <div
                  class="text-danger"
                  v-if="form.errors.has('status')"
                  v-html="form.errors.get('status')"
                />

                <label class="form-check-label" for="instatus">Inactive</label>
              </div>
            </div>
            <!-- /.card-body -->

            <div class="card-footer">
              <button
                type="submit"
                :disabled="form.busy"
                class="btn btn-primary"
              >
                Update Post
              </button>
              <button type="reset" class="btn btn-danger float-right">
                Cancel
              </button>
            </div>
          </form>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "add-post",
  data: function () {
    return {
      form: new Form({
        title: null,
        content: null,
        thumbaile: "",
        avatar: "",
        category_id: "",
        //slug:null,
        status: 1,
      }),
    };
  },

  mounted() {
    this.$store.dispatch("categoryAll");
    this.edit();
  },
  computed: {
    getCategory() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    addPost: function () {
       let PostId = this.$route.params.id;
      let test = this;
      Vue.swal
        .fire({
          title: "Do you want to Update the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Update",
          denyButtonText: `Don't Update`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.form
              .post("/postEditStore/" + PostId)
              .then(function (data) {

                test.$router.push("post");
                Vue.swal.fire("Saved!", "", "success");
              })
              .catch(function (error) {
                Vue.swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              });
          } else if (result.isDenied) {
            Vue.swal.fire("Changes are not saved", "", "info");
          } else {
            Vue.swal.fire({
              icon: "error",
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
            });
          }
        });
    },
    upload_avatar(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      if (file["size"] < 2111775) {
        reader.onloadend = (file) => {
          //console.log('RESULT', reader.result)
          this.form.avatar = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size can not be bigger than 2 MB");
      }
    },
    //For getting Instant Uploaded Photo
    get_avatar() {
      let photo = this.form.avatar;
      return photo;
    },
    edit(id) {
      let test = this;
      axios.get("postEdit/" + test.$route.params.id).then(function (response) {
        let post = response.data.post;
        test.form.fill(post);
        console.log(post);
        // test.$store.dispatch("categoryAll");
      });
    },
  },
};
</script>
