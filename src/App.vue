<script>
import { nanoid } from "nanoid";
import { setCanvasBG, sendPNG, setupCanvas, resizeCanvas } from "./canvas";
import CustomSelect from "./components/CustomSelect.vue";
import TheHeader from './components/TheHeader.vue'
export default {
  data: () => ({
    wWidth: "",
    wHeight: "",
    name: "",
    email: "",
    prints2send: [],
    images2send: [],
    fontFamily: "Lobster",
    fontColor: "Фуксия",
    user: "",
    color: "Белый",
    size: "36-38",
    isOrder: false,
    phone: "",
    tcolors: [
      { color: "white", name: "Белый" },
      { color: "#1a1a1a", name: "Черный" },
      { color: "#ff0000", name: "Красный" },
      { color: "#f29d33", name: "Желтый" },
      { color: "#1961ae", name: "Синий" },
      { color: "#42853f", name: "Зеленый" },
      { color: "#ec6433", name: "Оранжевый" },
      // { color: "#275741", name: "Темно-зеленый" },
      // { color: "#cccbd7", name: "Серый меланж" },
      // { color: "#14274e", name: "Темно-синий" },
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
    buy() {
      if (this.phone) {
        let image = sendPNG();
        let text = `Шрифт ${this.fontFamily} цвет ${this.fontColor}`;
        let meta1 =
          this.images2send.length !== 0
            ? `Оригиналы ${this.images2send}`
            : "Без картинок";
        let meta2 =
          this.prints2send.length !== 0
            ? `Принты ${this.prints2send}`
            : "Без принтов";
        let meta = `${meta1}
        ${meta2}`;
        let tshirt = `${this.name} - ${this.email} заказал Футболку ${this.color} размер ${this.size}`;
        let data = {
          phone: this.phone,
          tshirt,
          text,
          meta,
          image,
        };
        try {
          fetch("http://localhost:5001/mailer-266c2/us-central1/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          alert("Заказ оформлен");
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Введите телефон");
      }
    },
    setSize(s) {
      this.size = s;
    },
    setColor(color) {
      setCanvasBG(color);
      let col;
      this.tcolors.forEach((c) => (c.color == color ? (col = c.name) : null));
      this.color = col;
    },
    handleResize() {
      this.wWidth = window.innerWidth;
      this.wHeight = window.innerHeight;
      // console.log(this.wWidth,this.wHeight);
      resizeCanvas(this.wWidth, this.wHeight);
    },
  },
  mounted() {
    this.wWidth = window.innerWidth;
    this.wHeight = window.innerHeight;
    setupCanvas(this.wWidth, this.wHeight);
    window.addEventListener("resize", this.handleResize);
    let ls = this.getLS();
    if (ls) {
      this.user = ls;
    } else {
      let id = nanoid();
      this.user = id;
      this.saveLS(id);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: { CustomSelect,TheHeader },
};
</script>

<template lang='pug'>
.modal-wrapper(v-if="isOrder", @click.self="isOrder = false")
  .m-auto 
    .modal
      label(for="phone") Номер телефона*
      input#phone(v-model="phone", type="tel", pattern="[0-9]{11}", required)
      label(for="name") Имя
      input#name(v-model="name")
      label(for="email") E-mail
      input#email(v-model="email")
      .mt-auto.fcc
        p.text-xxs Способ нанесения - термоперенос
        p.text-xxs Eсли картинка нарушает авторские права, мы вам сообщим
        button.orderbutton(@click.prevent="buy") Оформить
    div(class='h-[30vh]')
TheHeader
.constructor
  router-view.routerview(
    :wWidth="wWidth",
    :wHeight="wHeight",
    :user="user",
    @set-size="setSize",
    @set-color="setColor",
    @make-order="isOrder = true",
    @set-font-family="fontFamily = $event",
    @set-font-color="fontColor = $event",
    @add-image="images2send.push($event), images2send.push(' ')",
    @add-print="prints2send.push($event), prints2send.push(' ')"
  )
  .canvaswrapper
    canvas#canvas
    img(class="detail" src="./assets/detail.png" alt="размеры")
    button.price(@click="isOrder = true") Цена 1150 руб.
      img.cartimg(src="./assets/cart.png")
</template>

<style>

</style>