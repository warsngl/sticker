<template lang='pug'>
ul.navbar
  li.cursor-pointer(@click='addText')
    img.w-8(v-if="$route.path=='/text'" src='../assets/add.png')
    .items-center.flex.flex-col(v-else)
      <svg viewBox="0 0 1024 1024"><path d="M213.333 170.667v128h234.667v512h128v-512h234.667v-128z"></path></svg>
      p Добавить
      p(class='-mt-2') надпись
  li
    p Цвет надписи
    CustomSelect.w-28(:options='fcolors' @input='changeFontColor($event)')
  li
    //- p Шрифт
    select(@change='changeFontFamily($event.target.value)')
      option(disabled selected) Шрифт
      option(v-for='f in fonts' :value='f') {{f}}
</template>

<script>
import CustomSelect from './CustomSelect.vue'
import { addText, setColor,setFont } from "../canvas";
export default {
  props:{
    user:String,
  },
  data:()=>({
    fonts:[
      "Ruslan Display",
      "Lobster",
      "Oswald",
      "Comfortaa",
      "Pacifico",
      "Amatic SC",
      "Neucha",
      "Rubik Beastly",
    ],
    fcolors:[
      {name:'Белый',color:'#fff'},
      {name:'Синий',color:'#053285'},
      {name:'Красный',color:'#e00053'},
      {name:'Черный',color:'#000000'},
      {name:'Зеленый',color:'#007749'},
      {name:'Желтый',color:'#ffc41c'},
      {name:'Голубой',color:'#009cde'},
      {name:'Оранжевый',color:'#ff5200'},
      {name:'Фуксия',color:'#e4002b'},
      {name:'Золото глянцевое',color:'#ccad6b'},
      {name:'Розовый неон',color:'#ff5f1f'},
      {name:'Желтый неон',color:'#eef525'},
      {name:'Зеленый неон',color:'#1ecc21'},
      {name:'Светоотражающий',color:'#b2aeae'},
      // {name:'Темно синий',color:'#08204e'},
      // {name:'Фиолетовый',color:'#2b1c69'},
      // {name:'Бордовый',color:'#80225f'},
      // {name:'Коричевый',color:'#612f19'},
      // {name:'Синий флуор',color:'#0687d0'},
    ],
  }),
  methods:{
    addText(){
      addText()
    },
    changeFontFamily(font){
      this.$emit('set-font-family',font)
      setFont(font)
    },
    changeFontColor(color){
      let col
      this.fcolors.forEach(c=>c.color==color&&(col=c.name))
      this.$emit('set-font-color',col)
      setColor(color)
    },
  },
  components:{CustomSelect}
}
</script>

<style>

</style>