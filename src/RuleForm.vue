<script>
export default {
  name: "RuleForm",
  data() {
    return {
      state: 1,
      has: [],
      becomes: 1
    };
  },
  methods: {
    handleStateChange(event) {
      this.state = event.target.value;
    },

    handleHasChange(event) {
      this.has = event.target.value.split(",");
    },

    handleBecomesChange(event) {
      this.becomes = event.target.value;
    },

    handleButtonClick() {
      this.$emit("addrule", {
        state: this.state,
        has: this.has,
        becomes: this.becomes
      });
      this.has = [];
    }
  }
};
</script>

<template>
  <tr>
    <td>
      <select name="state" :value="state" @change="handleStateChange">
        <option :value="1">Alive</option>
        <option :value="0">Dead</option>
      </select>
    </td>
    <td>
      <input name="has" type="text" :value="has.join(',')" @change="handleHasChange" />
    </td>
    <td>
      <select name="becomes" :value="becomes" @change="handleBecomesChange">
        <option :value="1">Alive</option>
        <option :value="0">Dead</option>
      </select>
    </td>
    <td>
      <button @click="handleButtonClick">Add</button>
    </td>
  </tr>
</template>