<script>
import { template } from "./lib/world";

export default {
  name: "Controls",
  props: ["step", "rows", "cols", "speed", "started"],
  methods: {
    handleStartStop() {
      if (this.started) {
        this.$emit("stop");
      } else {
        this.$emit("start");
      }
    },

    handleClear() {
      this.$emit("clear");
    },

    handleRowsChange(e) {
      this.$emit("updateworld", {
        speed: this.speed,
        rows: parseInt(e.target.value, 10),
        cols: this.cols,
      });
    },

    handleColsChange(e) {
      this.$emit("updateworld", {
        speed: this.speed,
        rows: this.rows,
        cols: parseInt(e.target.value, 10),
      });
    },

    handleSpeedChange(e) {
      this.$emit("updatespeed", {
        speed: parseInt(e.target.value, 10),
      });
    },

    handleTemplateClick() {
      this.$emit("forceworld", { world: template });
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid grey;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.row {
  margin-bottom: 12px;
  flex: 1;
}

.step {
  background: lightgray;
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 12px;
  text-align: center;
}

.step-text {
  color: gray;
}

.button {
  background-color: steelblue;
  font-weight: normal;
  outline: none;
  width: 100%;
  color: white;
  border: steelblue;
  border-radius: 4px;
  cursor: pointer;
}

.title {
  font-size: 14px;
  margin-bottom: 4px;
}

input[type="number"] {
  font-size: 14px;
  padding: 4px;
  width: 100%;
}

input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  outline: none;
  margin: 18px 0;
  width: 100%;
}

input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: steelblue;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: steelblue;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: steelblue;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: steelblue;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>

<template>
  <div class="container">
    <div class="row">
      <button class="button" @click="handleStartStop">
        <span v-if="started">Stop</span>
        <span v-else>Start</span>
      </button>
    </div>
    <div class="row">
      <button class="button" @click="handleClear">Reset</button>
    </div>
    <div class="step">
      <span class="step-text">Step {{ step }}</span>
    </div>
    <div class="row">
      <span class="title">Rows</span>
      <input
        name="rows"
        type="number"
        :value="rows"
        @change="handleRowsChange"
      />
    </div>
    <div class="row">
      <span class="title">Columns</span>
      <input
        name="cols"
        type="number"
        :value="cols"
        @change="handleColsChange"
      />
    </div>
    <div class="row">
      <span class="title">Speed ({{ speed }})</span>
      <input
        name="speed"
        type="range"
        :value="speed"
        @change="handleSpeedChange"
        min="1"
        max="1001"
      />
    </div>
    <div class="row">
      <button @click="handleTemplateClick()">Template</button>
    </div>
  </div>
</template>
