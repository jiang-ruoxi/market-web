<template>
  <div class="search-component">

  </div>
</template>

<script setup>
import { emitter } from '@/utils/bus.js'
import { ref } from 'vue'

defineOptions({
  name: 'BtnBox',
})

const reload = ref(false)
const handleReload = () => {
  reload.value = true
  emitter.emit('reload')
  setTimeout(() => {
    reload.value = false
  }, 500)
}

</script>
<style scoped lang="scss">

.search-component {
  @apply inline-flex overflow-hidden text-center gap-5 mr-5;
  div{
    @apply cursor-pointer;
  }
}

@keyframes turn {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>
