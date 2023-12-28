<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="现价:" prop="cPrice">
          <el-input v-model.number="formData.cPrice" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="原价:" prop="oPrice">
          <el-input v-model.number="formData.oPrice" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="有效天数:" prop="number">
          <el-input v-model.number="formData.number" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="赠送天数:" prop="numberExt">
          <el-input v-model.number="formData.numberExt" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="类型,1付费,2积分:" prop="type">
          <el-switch v-model="formData.type" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
       </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  createPays,
  updatePays,
  findPays
} from '@/api/pays'

defineOptions({
    name: 'PaysForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            name: '',
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
            type: false,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findPays({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.repays
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createPays(formData.value)
               break
             case 'update':
               res = await updatePays(formData.value)
               break
             default:
               res = await createPays(formData.value)
               break
           }
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
