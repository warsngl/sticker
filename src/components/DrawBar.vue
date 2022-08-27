<template lang='pug'>
.fc
  p.font-bold Рисуйте! По завершению "Назад"
</template>

<script>
import {handleDrawing} from '../canvas'
export default {
  mounted(){
    handleDrawing()
  },
  beforeUnmount(){
    handleDrawing()
  }
}
</script>

<style>

</style>