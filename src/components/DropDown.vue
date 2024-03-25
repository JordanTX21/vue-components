<template>
  <div class="accordion">
    <div class="header" @click="toggle" >
      <button type="button"  :class="show ? 'bg-shalom text-white' : 'bg-white'"  class="w-full hs-collapse-toggle py-3 px-4 flex justify-between items-center gap-x-2 text-sm
             rounded-lg border-2 border-shalom bg-white text-color-card-air disabled:opacity-50 font-medium
             disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              id="hs-basic-collapse" data-hs-collapse="#hs-basic-collapse-heading">
        <span><slot name="header"></slot></span>
        <svg :class="show ? 'text-white' : 'text-shalom'" class="hs-collapse-open:rotate-180 flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
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