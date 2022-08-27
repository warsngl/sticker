<template lang='pug'>
ul.scroll(v-if="!imgs.lenght")
  li.relative(class='h-8 w-8 lg:h-16 lg:w-16')
    input.opacity-0.absolute.w-full.h-full.z-10.cursor-pointer(type="file", @change="uploadImage($event.target.files[0])")
    <svg fill='#e85222' viewBox="0 0 1024 1024"><path d="M825.6 428.373c-29.013-147.2-158.293-257.707-313.6-257.707-123.307 0-230.4 69.973-283.733 172.373-128.427 13.653-228.267 122.453-228.267 254.293 0 141.227 114.773 256 256 256h554.667c117.76 0 213.333-95.573 213.333-213.333 0-112.64-87.467-203.947-198.4-211.627zM597.333 554.667v170.667h-170.667v-170.667h-128l213.333-213.333 213.333 213.333h-128z"></path></svg>
  li(
    v-for="i in imgs",
    :key="i.name",
    :class="i.isUsed && 'border-2 border-blue-600 shadow'"
    class='px-1 lg:py-3 lg:px-0'
  )
    //add checkbox
    img(
      class='h-8 lg:h-20'
      crossOrigin="anonymous",
      :id="i.name",
      :src="i.url",
      @click="handleImage(i.name)"
    )
  </template>

<script>
import { nanoid } from "nanoid";
import storage from "../firebase/config";
import { uploadBytes, ref,listAll } from "firebase/storage";
import { addImage } from "../canvas";
export default {
  props:{
    user:String,
  },
  data: () => ({
    imgs: [],
  }),
  methods: {
    uploadImage(f) {
      console.log(f);
      let id = nanoid();
      const storageRef = ref(storage, `${this.user}/${id}.jpg`);
      uploadBytes(storageRef, f).then(async (snapshot) => {
        console.log(`Uploaded by ${this.user}!`);
        // console.log(snapshot);
        this.imgs.unshift({
          url: await this.getUrl(`${id}.jpg`,this.user),
          name: id,
          isUsed: false,
        });
      });
    },
    async handleImage(name) {
      addImage(name);
      this.$emit('add-image',await this.getUrl(name,this.user))
    },
    async getImages() {
      listAll(ref(storage, this.user)).then((res) => {
        res.items.forEach(async (i) => {
          this.imgs.push({
            url: await this.getUrl(i.name,this.user),
            name: i.name,
            isUsed: false,
          });
        });
      });
    },
  },
  async mounted() {
    await this.getImages();
  },
};
</script>

<style>
</style>