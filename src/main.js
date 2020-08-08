import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { buildNewWorld, initialWorld } from "./lib/world";
import { generateId } from "./lib/util";
import "./main.css";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    rules: [
      {
        id: generateId(),
        state: 1,
        has: [2, 3],
        becomes: 1,
      },
      {
        id: generateId(),
        state: 0,
        has: [3],
        becomes: 1,
      },
    ],
    started: false,
    step: 0,
    rows: initialWorld.rows,
    cols: initialWorld.cols,
    speed: 700,
    world: buildNewWorld(initialWorld.rows, initialWorld.cols),
  },
  mutations: {
    addRule(state, rule) {
      const { state: celState, has, becomes } = rule;
      state.rules.push({
        id: generateId(),
        state: parseInt(celState, 10),
        has: has.filter((n) => n).map((n) => parseInt(n, 10)),
        becomes: parseInt(becomes, 10),
      });
    },
    removeRule(state, id) {
      const index = state.rules.findIndex((r) => r.id !== id);
      state.rules.splice(index, 1);
    },
    start(state) {
      state.started = true;
    },

    stop(state) {
      state.started = false;
    },

    clear(state) {
      state.world = buildNewWorld(state.rows, state.cols);
    },

    updateWorld(state, { newRows, newCols }) {
      state.rows = newRows;
      state.cols = newCols;
      state.world = buildNewWorld(newRows, newCols);
    },

    updateSpeed(state, newSpeed) {
      state.speed = newSpeed;
    },

    clickCell(state, { rowIndex, columnIndex }) {
      const newWorld = state.world.slice(0);
      const currentValue = newWorld[rowIndex][columnIndex];
      const newValue = 1 - currentValue;
      newWorld[rowIndex].splice(columnIndex, 1, newValue);
      state.world = newWorld;
    },

    nextWorld(state, { world, incStep }) {
      state.world = world;
      if (incStep) {
        state.step += 1;
      }
    },
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
