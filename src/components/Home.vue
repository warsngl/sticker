<template lang='pug'>
ul.navbar
  li
    router-link(v-if='wWidth<560' to='/product')
      <svg viewBox="0 0 1024 1024"><path d="M850.708 129.453l-169.355-82.787c0 0-27.569 141.92-169.353 141.92s-169.353-141.92-169.353-141.92l-169.355 82.787c39.385 78.845 47.261 354.8 47.261 437.588 0 82.787-3.937 354.8-3.937 354.8 66.953 43.364 181.168 55.191 295.384 55.191s228.431-11.827 295.384-55.191c0 0-3.937-272.013-3.937-354.8 0-82.788 7.876-358.743 47.261-437.588z"></path><path d="M137.847 157.049c0 0 39.384 122.209 39.384 354.8l-177.231-86.729 137.847-268.071z"></path><path d="M886.153 157.049c0 0-39.384 122.209-39.384 354.8l177.231-86.729-137.847-268.071z"></path></svg>
      p Цвет и
      p.shift размер
    ProductBar(
      
      v-else
      @set-color="$emit('set-color', $event)",
      @set-size="$emit('set-size', $event)"
    )
  li.relative
    //- #imgcontainer
    input.opacity-0.absolute.w-full.h-full.z-10.cursor-pointer(
      type="file",
      @change="uploadImage($event.target.files[0])"
    )
    svg(viewBox="0 0 1024 1024")
      path(
        d="M896 810.667v-597.333c0-46.933-38.4-85.333-85.333-85.333h-597.333c-46.933 0-85.333 38.4-85.333 85.333v597.333c0 46.933 38.4 85.333 85.333 85.333h597.333c46.933 0 85.333-38.4 85.333-85.333zM362.667 576l106.667 128.427 149.333-192.427 192 256h-597.333l149.333-192z"
      )
    p Загрузить
    p.shift картинку
  li
    router-link(v-if='wWidth<560' to='/text')
      <svg viewBox="0 0 1024 1024"><path d="M213.333 170.667v128h234.667v512h128v-512h234.667v-128z"></path></svg>
      p Добавить
      p.shift надпись
    TextBar.w-full(
      
      v-else
      @set-font-family="$emit('set-font-family', $event)",
      @set-font-color="$emit('set-font-color', $event)"
    )
  li.cursor-pointer
    //print
    router-link(to='/prints')
      img.printimg(src='../assets/print.png')
      p Готовые
      p.shift принты
</template>

<script>
import { nanoid } from "nanoid";
import storage from "../firebase/config";
import { uploadBytes, ref } from "firebase/storage";
import ProductBar from "./ProductBar.vue";
import TextBar from "./TextBar.vue";
import { addImageFromURL } from "../canvas";
export default {
  props: {
    user: {
      type: String,
    },
    wWidth:{
      type:Number
    },
    wHeight:{
      type:Number
    },
  },
  data: () => ({}),
  methods: {
    async uploadImage(f) {
      console.log(f);
      let id = nanoid();
      let user = this.user;
      const storageRef = ref(storage, `${this.user}/${id}.jpg`);
      uploadBytes(storageRef, f).then(async (snapshot) => {
        console.log(`Uploaded by ${this.user}!`);
        // console.log(snapshot);
        let url = await this.getUrl(`${id}.jpg`, user);
        // let img=document.createElement('img')
        // img.src=url
        // img.crossOrigin="anonymous"
        // document.getElementById('imgcontainer').appendChild(img);
        // addImage(img)
        addImageFromURL(url);
        this.$emit("add-image", url);
      });
    },
  },
  components: { ProductBar, TextBar },
};
</script>

<style>
/* #imgcontainer{ */
  /* position:absolute; */
  /* z-index:-100; */
  /* opacity: 0; */
/* } */
.printimg{
  @apply mx-auto w-8 lg:w-12;
}
.shift{
  @apply -mt-2
}
</style>