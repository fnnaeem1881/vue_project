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
                <label @click="toggle()" for="category">Select Category</label>
                      <div class="aselect" >
                    <div class="selector" @click="toggle()">
                        <div class="label">
                                <span v-if="form.category_id == 'Select Category'">{{form.category_id}}</span>
                                <span id="category_id"  v-else >{{ form.category_name }} <br><p style="font-size:12px">{{ form.category_name }}</p>
                                </span>
                        </div>
                        <div class="arrow" :class="{ expanded : visible }"></div>
                        <div :class="{ hidden : !visible, visible }">
                            <ul>
                                <li :class="{ current : item === form.category_id }" v-for="item in getCategory" @click="select(item)">
                                    {{ item.name }} </br><p style="font-size:12px">{{ item.slug }}</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- <select

                >v-model="form.category_id"
                  class="form-control"
                  id="category_id"
                  <option v-for="category in getCategory" :value="category.id">
                    {{ category.name }}
                  </option>
                </select> -->
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
                  type="file"
                  class="form-control"
                  id="thumbaile"
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
                  <img
                    width="100px"
                    :src="get_avatar()"
                    v-bind:style="form.styleObject"
                  />
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
                Add Post
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
        avatar: null,
        category_id: "Select Category",
        category_name:'',
        //slug:null,
        status: 1,
      }),
      hidden: false,
      visible: false,

    };
  },
  mounted() {
    this.$store.dispatch("categoryAll");
  },
  computed: {
    getCategory() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    addPost: function () {
      let test = this;
      Vue.swal
        .fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.form
              .post("/submit-post")
              .then(function (data) {
                test.$router.push("post");
                test.form.title = null;
                test.form.content = null;
                test.form.thumbaile = null;
                test.avatar = "";
                test.form.status = null;
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
    toggle() {
      this.visible = !this.visible;
    },
    select(option) {
      this.form.category_id = option.id;
      this.form.category_name = option.name;
    },
  },
};
</script>
<style>
.aselect {
  width: 280px;
}
.aselect .selector {
  border: 1px solid gainsboro;
  background: #f8f8f8;
  position: relative;
  z-index: 1;
}
.aselect .selector .arrow {
  position: absolute;
  right: 10px;
  top: 40%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid #888;
  transform: rotateZ(0deg) translateY(0px);
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
}
.aselect .selector .expanded {
  transform: rotateZ(180deg) translateY(2px);
}
.aselect .selector .label {
  display: block;
  padding: 12px;
  font-size: 16px;
  color: #888;
}
.aselect ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
  border: 1px solid gainsboro;
  position: absolute;
  z-index: 1;
  background: #fff;
}
.aselect li {
  padding: 12px;
  color: #666;
}
.aselect li:hover {
  color: white;
  background: seagreen;
}
.aselect .current {
  background: #eaeaea;
}
.aselect .hidden {
  visibility: hidden;
}
.aselect .visible {
  visibility: visible;
}
</style>
