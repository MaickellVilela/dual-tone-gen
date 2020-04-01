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
        <p class="font-normal mt-12 mb-2 text-lg mr-32 text-teal-900 opacity-75">Lightweight and out of the box <span class="font-medium">svg filter generator</span> for dual tone or gradient map, cal it as you want.</p>
        <p class="font-normal text-lg mr-32 text-teal-900 opacity-75">Works with svg, png, jpg... </p>
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
        <div class="image">
          <label for="file" class="image__input-label">drag your image here or click to upload</label>
          <img
            class="image__preview"
            :style="{ filter: `url(#${filterName})` }"
            :src="imagePath"
          />
          <input class="image__file-input" type="file" id="file" name="file" @change="onFileSelected" />
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
      darksInput: "#234E52",
      lightsInput: "#48BB78",
      filterName: "duotone_peachypink",
      selectedFile: null,
      imagePath:
        "https://images.unsplash.com/photo-1516670080453-15aacb2e6bc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3750&q=80"
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
.image {
  $main: &;
  position: relative;
  overflow: hidden;
  &__input-label {
    font-weight: 300;
    cursor: pointer;
    position: absolute;
    z-index: 10;
    color: white;
    margin: 1rem;
    opacity: 0.3;
    transition: all 0.3s ease-in-out;
    #{$main}:hover & {
      opacity: 1;
    }
  }
  &__file-input {
    outline: none;
    margin-left: -400px;
    &::-webkit-file-upload-button {
      visibility: hidden;
    }
    &::before {
      content: '';
      display: inline-block;
      background: transparent;
      width: 100%;
      height: calc(100% - 29px);
      position: absolute;
      top: 0;
      left: 0;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
    }
    &:hover::before {
    }
    &:active::before {
    }
  }
  &__preview {
    display: block;
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
  }
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
