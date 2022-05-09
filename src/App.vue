<template>
  <t-header></t-header>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import THeader from "./components/THeader.vue";
import "mosha-vue-toastify/dist/style.css";
export default defineComponent({
  components: { THeader },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #191920 url("@/assets/images/background.svg") no-repeat center top;
  -webkit-font-smoothing: antialiased;
}

body,
input,
button {
  font: 14px Roboto, sans-serif;
}

#app {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px 50px;
}

button {
  cursor: pointer;
}
</style>
