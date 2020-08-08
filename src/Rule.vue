<script>
export default {
  name: "Rule",
  props: ["id", "state", "has", "becomes"],
  data() {
    return {
      labels: ["Dead", "Alive"]
    };
  },
  methods: {
    handleButtonClick(id) {
      this.$emit("removerule", { id });
    }
  }
};
</script>

<template>
  <tr>
    <td>{{ labels[state] }}</td>
    <td>{{ has.join(", ") }}</td>
    <td>{{ labels[becomes] }}</td>
    <td>
      <button @click="handleButtonClick(id)">x</button>
    </td>
  </tr>
</template>