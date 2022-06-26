<template>
    <div>
        <div class="container-fluid">
            <div class="col-6 pt-3 offset-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Edit Category</h3>

                        <div class="card-tools">
                            <router-link to="/categoris" class="btn btn-info">
                                ALl Category
                            </router-link>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <form @submit.prevent="editCategory">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="name">Category Name</label>
                                <input
                                    type="text"
                                    v-model="form.name"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter Category Name"
                                />
                                <div
                                    class="text-danger"
                                    v-if="form.errors.has('name')"
                                    v-html="form.errors.get('name')"
                                />
                            </div>

                            <!-- <div class="form-group">
                      <label for="slug">Category Slug</label>
                      <input type="text" class="form-control" id="slug" placeholder="Enter Category Slug">
                  </div> -->
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="status"
                                    >Status</label
                                >
                            </div>
                            <div class="form-check form-check-inline">
                                <input
                                    type="radio"
                                    v-model="form.status"
                                    class="form-check-input"
                                    id="status"
                                    value="1"
                                />

                                <label class="form-check-label" for="status"
                                    >Active</label
                                >
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

                                <label class="form-check-label" for="instatus"
                                    >Inactive</label
                                >
                            </div>
                        </div>
                        <!-- /.card-body -->

                        <div class="card-footer">
                            <button
                                type="submit"
                                :disabled="form.busy"
                                class="btn btn-primary"
                            >
                                Update Category
                            </button>
                            <router-link
                                to="/categoris"
                                class="btn btn-danger float-right"
                            >
                                Cancel
                            </router-link>
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
    name: "edit-categoris",
    data: function () {
        return {
            form: new Form({
                name: null,
                //slug:null,
                status: 1,
            }),
        };
    },
    mounted() {
        this.edit();
    },
    methods: {
        editCategory: function () {
            let CatId = this.$route.params.id;
            //alert(CatId);
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
                            .post("/categoryEditStore/" + CatId)
                            .then(function (data) {
                                test.$router.push("categoris");
                                Vue.swal.fire("Update!", "", "success");
                            })
                            .catch(function (error) {
                                Vue.swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!",
                                });
                            });
                    } else if (result.isDenied) {
                        Vue.swal.fire("Changes are not Update", "", "info");
                    } else {
                        Vue.swal.fire({
                            icon: "error",
                            title: "Cancelled",
                            text: "Your imaginary file is safe :)",
                        });
                    }
                });
        },
        edit(id) {
            let test = this;
            axios
                .get("/categoryEdit/" + test.$route.params.id)
                .then(function (response) {
                    let category = response.data.category;
                    test.form.fill(category);
                    // test.$store.dispatch("categoryAll");
                });
        },
    },
};
</script>
