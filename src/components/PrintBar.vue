<template lang='pug'>
ul.scroll(v-if="!prints.lenght")
  li
    router-link.fc(v-if="!(this.$route.path == '/')", to="/")
      img.backward(src="../assets/backward.svg")
  li(
    class='h-20 lg:h-32'
    v-for="i in prints",
    :key="i.name",
    :class="i.isUsed && 'border-2 border-blue-600 shadow'"
  )
    //add checkbox 
    img.h-full(
      crossOrigin="anonymous",
      :id="i.name",
      :src="i.url",
      @click="handleImage(i.name)"
    )
</template>

<script>
import storage from "../firebase/config";
import { ref,listAll } from "firebase/storage";
import { addImage } from "../canvas";
export default {
  props:{
    user:String,
  },
  data: () => ({
    prints: [],
  }),
  methods: {
    async handleImage(id) {
      addImage(id);
      this.$emit('add-print',await this.getUrl(id,'prints'))
    },
    async getImages() {
      listAll(ref(storage, 'prints')).then((res) => {
        res.items.forEach(async (i) => {
          this.prints.push({
            url: await this.getUrl(i.name,'prints'),
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

<style scoped>
img{
  max-width: unset !important;
}
</style>