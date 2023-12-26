<template>
  <div>
    <el-row :gutter="10">

前期去去去
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const page = ref(0)

defineOptions({
  name: ''
})


</script>

<style scoped>


.org-img {
  height: 150px;
  width: 150px;
}


.dom-center {
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
