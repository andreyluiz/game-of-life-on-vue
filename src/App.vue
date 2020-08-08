<template>
  <div class="simulator">
    <div class="col controls">
      <controls
        :started="$store.state.started"
        :step="$store.state.step"
        :rows="$store.state.rows"
        :cols="$store.state.cols"
        :speed="$store.state.speed"
        @start="handleStart"
        @stop="handleStop"
        @clear="handleClear"
        @updateworld="handleUpdateWorld"
        @updatespeed="handleUpdateSpeed"
        @forceworld="handleForceWorld"
      />
    </div>
    <div class="col">
      <div class="row rules">
        <rules
          :rules="$store.state.rules"
          @addrule="handleAddRule"
          @removerule="handleRemoveRule"
        />
      </div>
      <div class="row world">
        <world :world="$store.state.world" @cellclick="handleCellClick" />
      </div>
    </div>
  </div>
</template>

<script>
import Controls from "./Controls.vue";
import Rules from "./Rules.vue";
import World from "./World.vue";
import { nextWorld } from "./lib/world";
import { sleep } from "./lib/util";

export default {
  name: "App",
  components: {
    Controls,
    Rules,
    World,
  },
  methods: {
    handleAddRule(data) {
      this.$store.commit("addRule", data);
    },

    handleRemoveRule(data) {
      this.$store.commit("removeRule", data.id);
    },

    handleStart() {
      this.$store.commit("start");
      this.nextStep();
    },

    handleStop() {
      this.$store.commit("stop");
    },

    handleClear() {
      this.$store.commit("clear");
    },

    handleUpdateWorld(event) {
      const { rows: newRows, cols: newCols } = event;
      this.$store.commit("updateWorld", { newRows, newCols });
    },

    handleUpdateSpeed(data) {
      const { speed: newSpeed } = data;
      this.$store.commit("updateSpeed", newSpeed);
    },

    async nextStep() {
      if (this.$store.state.started) {
        requestAnimationFrame(() => {
          const world = nextWorld(
            this.$store.state.world,
            this.$store.state.rules
          );
          this.$store.commit("nextWorld", { world, incStep: true });
        });
        await sleep(1000 - this.$store.state.speed);
        this.nextStep();
      }
    },

    handleCellClick(event) {
      const { rowIndex, columnIndex } = event;
      this.$store.commit("clickCell", { rowIndex, columnIndex });
    },

    handleForceWorld(event) {
      this.$store.commit("nextWorld", { world: event.world, incStep: false });
    },
  },
};
</script>

<style scoped>
.simulator {
  display: flex;
  margin: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.col.controls {
  flex: 0 0 200px;
  margin-right: 12px;
}

.row {
  flex: 1 1 auto;
}

.row.rules {
  margin-bottom: 12px;
}
</style>
