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
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          edit
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
    name: "categoris"
    }
</script>
