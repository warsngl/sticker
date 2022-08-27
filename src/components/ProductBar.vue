<template lang='pug'>
ul.navbar
  li.fcc
    p Цвет футболки
    CustomSelect(:options="tcolors", @input="changeColor")
  //- p Размер
  li
    select(@change="changeSize($event.target.value)")
      option(selected disabled) Размер
      option(v-for="s in tsizes", :value="s.size") {{ s.size }}
  //- button(v-if="$route.fullPath=='product'" @click="save2png") Сохранить картинку
</template>

<script>
import CustomSelect from "./CustomSelect.vue";
import { savePNG } from "../canvas";
export default {
  props: {
    user: String,
  },
  data: () => ({
    tcolors: [
      { color: "white", name: "Белый" },
      { color: "#1a1a1a", name: "Черный" },
      { color: "#ff0000", name: "Красный" },
      { color: "#f29d33", name: "Желтый" },
      { color: "#1961ae", name: "Синий" },
      { color: "#42853f", name: "Зеленый" },
      // { color: "#275741", name: "Темно-зеленый" },
      // { color: "#cccbd7", name: "Серый меланж" },
      // { color: "#14274e", name: "Темно-синий" },
      { color: "#ec6433", name: "Оранжевый" },
      // { color: "#d9d9d9", name: "Светлый меланж" },
    ],
    tsizes: [
      { size: "36-38" },
      { size: "40-42" },
      { size: "44" },
      { size: "S" },
      { size: "M" },
      { size: "L" },
      { size: "XL" },
      { size: "XXL" },
      { size: "XXXL" },
    ],
  }),
  methods: {
    save2png() {
      this.$emit("make-order");
      savePNG();
    },
    changeColor(color) {
      this.$emit("set-color", color);
    },
    changeSize(size) {
      this.$emit("set-size", size);
    },
  },
  components: { CustomSelect },
};
</script>

<style>
</style>