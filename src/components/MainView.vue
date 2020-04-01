<template>
  <div class="main-view pt-32">
    <svg xmlns="http://www.w3.org/2000/svg" class="clip-filter">
      <filter :id="filterName">
        <feColorMatrix
          type="matrix"
          result="grayscale"
          values="1 0 0 0 0
                    1 0 0 0 0
                    1 0 0 0 0
                    0 0 0 1 0"
        ></feColorMatrix>
        <feComponentTransfer
          color-interpolation-filters="sRGB"
          result="duotone"
        >
          <feFuncR type="table" :tableValues="redTableValue"></feFuncR>
          <feFuncG type="table" :tableValues="greenTableValue"></feFuncG>
          <feFuncB type="table" :tableValues="blueTableValue"></feFuncB>
          <feFuncA type="table" tableValues="0 1"></feFuncA>
        </feComponentTransfer>
      </filter>
    </svg>
    <div class="container flex">
      <header class="w-1/2 h-32">
        <h1 class="text-5xl font-extrabold leading-none text-teal-900">Generate</h1>
        <h1 class="text-5xl font-extrabold leading-none text-green-500">Dual-Tone filter</h1>
        <h1 class="text-5xl font-extrabold leading-none text-teal-900">for your images on web</h1>
        <p class="mt-12 mb-2 text-lg mr-32 text-teal-900 opacity-75">Lightweight and out of the box <strong>svg filter generator</strong> for dual tone or gradient map, cal it as you want.</p>
        <p class="text-lg mr-32 text-teal-900 opacity-75">Works with svg, png, jpg... </p>
        <small class="text-teal-900 opacity-50">any kind of image suportted by your browser.</small>
        <div>
          <input type="color" id="darks" name="lights" v-model="darksInput" />
          <label for="darks">Darks {{ darksRGB }}</label>
        </div>
        <div>
          <input type="color" id="lights" name="lights" v-model="lightsInput" />
          <label for="lights">Lights {{ lightsRGB }}</label>
        </div>
      </header>
      <div class="w-1/2">
        <img
          class="test-image"
          :style="{ filter: `url(#${filterName})` }"
          :src="imagePath"
        />
        <div>
          <input type="file" id="file" name="file" @change="onFileSelected" />
          <label for="file">File {{ selectedFile }}</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import hexToRGB from "hex-rgb";

export default {
  name: "MainView",
  data: function() {
    return {
      r: `${135 / 255}` + ` ` + `${243 / 255}`,
      g: `${35 / 255}` + ` ` + `${239 / 255}`,
      b: `${135 / 255}` + ` ` + `${247 / 255}`,
      darksInput: "#ff0000",
      lightsInput: "#00ff00",
      filterName: "duotone_peachypink",
      selectedFile: null,
      imagePath:
        "https://images.unsplash.com/photo-1585544313985-f84aac5abf7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
    };
  },
  computed: {
    darksRGB: function() {
      return hexToRGB(this.darksInput);
    },
    lightsRGB: function() {
      return hexToRGB(this.lightsInput);
    },
    redTableValue: function() {
      return `${this.darksRGB.red / 255}` + ` ` + `${this.lightsRGB.red / 255}`;
    },
    greenTableValue: function() {
      return (
        `${this.darksRGB.green / 255}` + ` ` + `${this.lightsRGB.green / 255}`
      );
    },
    blueTableValue: function() {
      return (
        `${this.darksRGB.blue / 255}` + ` ` + `${this.lightsRGB.blue / 255}`
      );
    }
  },
  watch: {
    darksInput: function() {
      this.filterName = Date.now();
    },
    lightsInput: function() {
      this.filterName = Date.now();
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => {
        this.imagePath = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
};
</script>

<style scoped lang="scss">
.test-image {
  // filter: url("#duotone_peachypink");
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
