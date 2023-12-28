<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户id:" prop="userId">
          <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="订单:" prop="orderId">
          <el-input v-model.number="formData.orderId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="类型,1普通会员,2优选工匠,3积分兑换:" prop="type">
          <el-switch v-model="formData.type" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
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
        <el-form-item label="支付状态,1支付完成,0待支付:" prop="status">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
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
  createOrders,
  updateOrders,
  findOrders
} from '@/api/orders'

defineOptions({
    name: 'OrdersForm'
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
            userId: 0,
            orderId: 0,
            type: false,
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
            status: false,
        })
// 验证规则
const rule = reactive({
               userId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               orderId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               type : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               cPrice : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               oPrice : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               number : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               numberExt : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               status : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findOrders({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reorders
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
               res = await createOrders(formData.value)
               break
             case 'update':
               res = await updateOrders(formData.value)
               break
             default:
               res = await createOrders(formData.value)
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
