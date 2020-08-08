<script>
export default {
  name: "World",
  props: ["world"],
  methods: {
    handleCellClick(rowIndex, columnIndex) {
      this.$emit("cellclick", {
        rowIndex,
        columnIndex,
      });
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  max-height: 20px;
  margin: 0;
}

.cell {
  flex: 0 0 20px;
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  margin: 0;
  padding: 0;
  outline: none;
  border: 1px solid black;
}

.inner-cell {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  background-color: white;
}

.inner-cell.active {
  background-color: black;
}
</style>

<template>
  <div>
    <div v-for="(row, rowIndex) in world" class="row" :key="rowIndex">
      <div
        v-for="(column, columnIndex) in row"
        class="cell"
        @click="handleCellClick(rowIndex, columnIndex)"
        :key="columnIndex"
      >
        <div class="inner-cell" :class="{ active: column === 1 }" />
      </div>
    </div>
  </div>
</template>
