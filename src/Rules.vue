<script>
import Rule from "./Rule.vue";
import RuleForm from "./RuleForm.vue";

export default {
  name: "Rules",
  props: ["rules"],
  components: {
    Rule,
    RuleForm
  },
  methods: {
    handleAddRule(data) {
      this.$emit("addrule", data);
    },
    handleRemoveRule(data) {
      this.$emit("removerule", data);
    }
  }
};
</script>

<style scoped>
th {
  text-align: left;
}
</style>

<template>
  <table>
    <thead>
      <tr>
        <th>Is</th>
        <th>Has</th>
        <th>Becomes</th>
      </tr>
    </thead>
    <tbody>
      <rule v-for="rule in rules" :key="rule.id" v-bind="rule" @removerule="handleRemoveRule" />
      <rule-form :addrule="handleAddRule" />
    </tbody>
  </table>
</template>