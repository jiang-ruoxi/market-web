<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户OpendId:" prop="openId">
          <el-input v-model="formData.openId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="用户昵称:" prop="nickName">
          <el-input v-model="formData.nickName" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="用户头像:" prop="headUrl">
          <el-input v-model="formData.headUrl" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="用户姓名:" prop="realName">
          <el-input v-model="formData.realName" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="手机号:" prop="mobile">
          <el-input v-model="formData.mobile" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="优选工匠,1是,0否:" prop="isBest">
          <el-switch v-model="formData.isBest" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
       </el-form-item>
        <el-form-item label="主营类型:" prop="tagId">
          <el-input v-model.number="formData.tagId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="邀请人:" prop="parentId">
          <el-input v-model.number="formData.parentId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否为会员,1是,0否:" prop="isMember">
          <el-switch v-model="formData.isMember" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
       </el-form-item>
        <el-form-item label="会员截止日期:" prop="memberLimit">
          <el-input v-model.number="formData.memberLimit" :clearable="true" placeholder="请输入" />
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
  createMembers,
  updateMembers,
  findMembers
} from '@/api/members'

defineOptions({
    name: 'MembersForm'
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
            openId: '',
            nickName: '',
            headUrl: '',
            realName: '',
            mobile: '',
            isBest: false,
            tagId: 0,
            parentId: 0,
            isMember: false,
            memberLimit: 0,
        })
// 验证规则
const rule = reactive({
               openId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               nickName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               headUrl : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               mobile : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               parentId : [{
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
      const res = await findMembers({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.remembers
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
               res = await createMembers(formData.value)
               break
             case 'update':
               res = await updateMembers(formData.value)
               break
             default:
               res = await createMembers(formData.value)
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
