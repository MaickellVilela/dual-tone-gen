<template>
  <div class="main-view">
    <svg xmlns="http://www.w3.org/2000/svg" class="clip-filter">
      <filter id="duotone_peachypink">
        <feColorMatrix
          type="matrix"
          result="grayscale"
          values=".7 0 0 0 0
                    .7 0 0 0 0
                    .7 0 0 0 0
                    0 0 0 1 0"
        ></feColorMatrix>
        <feComponentTransfer
          color-interpolation-filters="sRGB"
          result="duotone"
        >
          <feFuncR type="table" :tableValues="r"></feFuncR>
          <feFuncG type="table" :tableValues="g"></feFuncG>
          <feFuncB type="table" :tableValues="b"></feFuncB>
          <feFuncA type="table" tableValues="0 1"></feFuncA>
        </feComponentTransfer>
      </filter>
    </svg>
    <img
      class="test-image"
      src="https://images.unsplash.com/photo-1585544313985-f84aac5abf7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
      alt=""
    />
  </div>
</template>

<script>
export default {
  name: "MainView",
  data: function() {
    return {
      r: `${180 / 255}` + ` ` + `${243 / 255}`,
      g: `${149 / 255}` + ` ` + `${239 / 255}`,
      b: `${200 / 255}` + ` ` + `${247 / 255}`
    };
  }
};
</script>

<style scoped lang="scss">
.test-image {
  filter: url("#duotone_peachypink");
  display: block;
  width: auto;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
.clip-filter {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 0;
  height: 0;
  left: -9999px;
}
</style>
