<template>
  <div>
    <div class="container-fluid">
      <div class="container_inner">
        <div class="text_container">
          <div ref="js_scene">
            <div class="title" data-depth="0.2">
              <p class="p404">
                4
                <span>0</span>4
              </p>
              <div class="line"></div>
            </div>

            <div class="title" data-depth="1">
              <p class="p404">
                4
                <span>0</span>4
              </p>
              <div class="line"></div>
            </div>
          </div>
          <div class="opps">
            <p>Opp! Looks like you got lost.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css?family=Barlow+Condensed:300,400,500,600,700,800,900|Barlow:300,400,500,600,700,800,900&display=swap");
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.container_inner {
  position: relative;
  top: 25%;
  left: 25%;
  width: 50%;
  min-width: 600px;
  max-width: 1000px;
  height: 65%;
  /* overflow: hidden; */
}

.circles {
  background: #f4b09e;
  position: absolute;
  bottom: 10px;
  border-radius: 100%;
  opacity: 1;
  box-shadow: 5px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

.text_container {
  position: absolute;
  top: 0%;
  width: 100%;
  text-align: center;
}

.title {
  position: absolute;
  top: 0;
  margin: 0 auto;
  width: 100%;
  font-family: "Barlow", sans-serif;
  font-size: 200px;
  font-weight: 700;
  letter-spacing: 4px;
  text-shadow: 0 32px 40px -20px rgba(0, 0, 0, 0.25);
  color: #6eced7;
  z-index: 2;
}
.title .p404 {
  margin: 0;
}
.title span {
  color: #f4b09e;
}
.title:nth-of-type(2) {
  color: #457a7c;
  z-index: 1;
  filter: blur(10px);
  opacity: 0.8;
}
.title:nth-of-type(2) span {
  color: #debdb3;
}

.line {
  margin: 0 auto;
  padding: 0;
  height: 10px;
  width: 50%;
  background: #6eced7;
  border-radius: 10px;
}

.opps {
  position: absolute;
  width: 100%;
  font-family: "Barlow Condensed", sans-serif;
  letter-spacing: 5px;
  color: #6eced7;
  top: 250px;
  z-index: 1;
}
</style>

<script>
export default {
  name: "not-found",

  mounted() {},
  computed: {},
  methods: {},
};
</script>
