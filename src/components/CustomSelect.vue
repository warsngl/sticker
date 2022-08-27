<template lang='pug'>
//- .custom-select(v-if="isMobile", :tabindex="tabindex", @blur="open = false")
//-   .selected.flex.items-center(:class="{ open: open }", @click="open = !open") {{ selected.name }}
//-     .ml-auto.mr-1.rounded-full.w-4.h-4(:style="{ background: selected.color }")
//-   ul.items(:class="{ selectHide: !open }", :style="itemsStyle")
//-     li.flex.items-center(
//-       v-for="option in options",
//-       :key="option",
//-       @click="selected = option; open = false; $emit('input', option.color)"
//-     ) {{ option.name }}
//-       .ml-auto.mr-1.rounded-full.w-4.h-4(:style="{ background: option.color }")
ul.flex.flex-wrap()
  li.w-4.h-4.rounded-full.relative.cursor-pointer.border(
    v-for="option in myOptions",
    :key="option.name",
    :style="{ background: option.color }",
    @click="$emit('input', option.color)"
    @mouseover='option.tooltip=true'
    @mouseleave='option.tooltip=false'
  )
    .tooltip(v-if="option.tooltip") {{option.name}}
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
      // isMobile: window.innerWidth < 500 ? true : false,
      myOptions:this.options.map(o=>({...o,tooltip:false}))
    };
  },
  computed: {
    // itemsStyle() {
    //   return this.reverse
    //     ? "top:0;border-radius: 6px 6px 6px 6px;border-bottom: 1px solid #ad8225;"
    //     : this.options.length > 12
    //     ? "top:-375px;"
    //     : 'top:-248px'
    // },
  },
};
</script>

<style scoped>
.tooltip{
  top:-19px;
  font-size:12px;
  z-index:10;
  position:absolute;
  background: white;
  white-space: nowrap;
  background: lightgray;
  border-radius:6px;
  padding: 0 6px;
}
.custom-select {
  position: relative;
  text-align: left;
  outline: none;
  width: 152px;
}
.custom-select .selected {
  border-radius: 6px;
  border: 1px solid #666666;
  color: #000;
  padding-left: 4px;
  cursor: pointer;
  user-select: none;
}
.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 6px 6px;
}
.custom-select .items {
  color: #000;
  border-radius: 6px 6px 0px 0px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-top: 1px solid #ad8225;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 1;
}
.custom-select .items li {
  padding-left: 4px;
  color: #000;
  cursor: pointer;
  user-select: none;
}
.custom-select .items li:hover {
  background-color: #ad8225;
}
.selectHide {
  display: none;
}
</style>