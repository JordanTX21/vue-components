<template>
  <div class="accordion">
    <div class="header" @click="toggle">
      <slot name="header"></slot>
    </div>
    <transition name="accordion"
                @before-enter="beforeEnter" @enter="enter"
                @before-leave="beforeLeave" @leave="leave">
      <div class="body" v-show="show">
        <div class="body-inner">
          <slot name="body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props:{
    show: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    toggle: function() {
      this.$emit("toggle")
    },
    beforeEnter: function(el) {
      el.style.height = '0';
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function(el) {
      el.style.height = '0';
    }
  }
}
</script>
<style scoped>
.accordion {

}

.accordion .header {
  position: relative;
  cursor: pointer;
}

.accordion .header-icon {
  position: absolute;
  top: 5px;
  right: 8px;
  transform: rotate(0deg);
  transition-duration: 0.3s;
}

.accordion .body {
  overflow: hidden;
  transition: 150ms ease-out;
}

.accordion .body-inner {
  overflow-wrap: break-word;
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

</style>