<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" :rules="searchRule" @keyup.enter="onSubmit">
      <el-form-item label="创建日期" prop="createdAt">
      <template #label>
        <span>
          创建日期
          <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </span>
      </template>
      <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始日期" :disabled-date="time=> searchInfo.endCreatedAt ? time.getTime() > searchInfo.endCreatedAt.getTime() : false"></el-date-picker>
       —
      <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束日期" :disabled-date="time=> searchInfo.startCreatedAt ? time.getTime() < searchInfo.startCreatedAt.getTime() : false"></el-date-picker>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
            <el-popover v-model:visible="deleteVisible" :disabled="!multipleSelection.length" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
                <el-button type="primary" @click="onDelete">确定</el-button>
            </div>
            <template #reference>
                <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true">删除</el-button>
            </template>
            </el-popover>
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
          <el-table-column align="left" label="编号" prop="ID" width="80" sortable />
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="用户OpendId" prop="openId" width="120" />
        <el-table-column align="left" label="用户昵称" prop="nickName" width="120" />
        <el-table-column align="left" label="用户头像" prop="headUrl" width="120" />
        <el-table-column align="left" label="用户姓名" prop="realName" width="120" />
        <el-table-column align="left" label="手机号" prop="mobile" width="120" />
        <el-table-column align="left" label="优选工匠,1是,0否" prop="isBest" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.isBest) }}</template>
        </el-table-column>
        <el-table-column align="left" label="主营类型" prop="tagId" width="120" />
        <el-table-column align="left" label="邀请人" prop="parentId" width="120" />
        <el-table-column align="left" label="是否为会员,1是,0否" prop="isMember" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.isMember) }}</template>
        </el-table-column>
        <el-table-column align="left" label="会员截止日期" prop="memberLimit" width="120" />
        <el-table-column align="left" label="操作" min-width="120">
            <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>
                查看详情
            </el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateMembersFunc(scope.row)">变更</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="gva-pagination">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?'添加':'修改'" destroy-on-close>
      <el-scrollbar height="500px">
          <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
            <el-form-item label="用户OpendId:"  prop="openId" >
              <el-input v-model="formData.openId" :clearable="true"  placeholder="请输入用户OpendId" />
            </el-form-item>
            <el-form-item label="用户昵称:"  prop="nickName" >
              <el-input v-model="formData.nickName" :clearable="true"  placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item label="用户头像:"  prop="headUrl" >
              <el-input v-model="formData.headUrl" :clearable="true"  placeholder="请输入用户头像" />
            </el-form-item>
            <el-form-item label="用户姓名:"  prop="realName" >
              <el-input v-model="formData.realName" :clearable="true"  placeholder="请输入用户姓名" />
            </el-form-item>
            <el-form-item label="手机号:"  prop="mobile" >
              <el-input v-model="formData.mobile" :clearable="true"  placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="优选工匠,1是,0否:"  prop="isBest" >
              <el-switch v-model="formData.isBest" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
            </el-form-item>
            <el-form-item label="主营类型:"  prop="tagId" >
              <el-input v-model.number="formData.tagId" :clearable="true" placeholder="请输入主营类型" />
            </el-form-item>
            <el-form-item label="邀请人:"  prop="parentId" >
              <el-input v-model.number="formData.parentId" :clearable="true" placeholder="请输入邀请人" />
            </el-form-item>
            <el-form-item label="是否为会员,1是,0否:"  prop="isMember" >
              <el-switch v-model="formData.isMember" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
            </el-form-item>
            <el-form-item label="会员截止日期:"  prop="memberLimit" >
              <el-input v-model.number="formData.memberLimit" :clearable="true" placeholder="请输入会员截止日期" />
            </el-form-item>
          </el-form>
      </el-scrollbar>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="detailShow" style="width: 800px" lock-scroll :before-close="closeDetailShow" title="查看详情" destroy-on-close>
      <el-scrollbar height="550px">
        <el-descriptions column="1" border>
                <el-descriptions-item label="用户OpendId">
                        {{ formData.openId }}
                </el-descriptions-item>
                <el-descriptions-item label="用户昵称">
                        {{ formData.nickName }}
                </el-descriptions-item>
                <el-descriptions-item label="用户头像">
                        {{ formData.headUrl }}
                </el-descriptions-item>
                <el-descriptions-item label="用户姓名">
                        {{ formData.realName }}
                </el-descriptions-item>
                <el-descriptions-item label="手机号">
                        {{ formData.mobile }}
                </el-descriptions-item>
                <el-descriptions-item label="优选工匠,1是,0否">
                    {{ formatBoolean(formData.isBest) }}
                </el-descriptions-item>
                <el-descriptions-item label="主营类型">
                        {{ formData.tagId }}
                </el-descriptions-item>
                <el-descriptions-item label="邀请人">
                        {{ formData.parentId }}
                </el-descriptions-item>
                <el-descriptions-item label="是否为会员,1是,0否">
                    {{ formatBoolean(formData.isMember) }}
                </el-descriptions-item>
                <el-descriptions-item label="会员截止日期">
                        {{ formData.memberLimit }}
                </el-descriptions-item>
        </el-descriptions>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createMembers,
  deleteMembers,
  deleteMembersByIds,
  updateMembers,
  findMembers,
  getMembersList
} from '@/api/members'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
    name: 'Members'
})

// 自动化生成的字典（可能为空）以及字段
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
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
              }
              ],
               nickName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
              }
              ],
               headUrl : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
              }
              ],
               mobile : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
              }
              ],
               parentId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
})

const searchRule = reactive({
  createdAt: [
    { validator: (rule, value, callback) => {
      if (searchInfo.value.startCreatedAt && !searchInfo.value.endCreatedAt) {
        callback(new Error('请填写结束日期'))
      } else if (!searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt) {
        callback(new Error('请填写开始日期'))
      } else if (searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt && (searchInfo.value.startCreatedAt.getTime() === searchInfo.value.endCreatedAt.getTime() || searchInfo.value.startCreatedAt.getTime() > searchInfo.value.endCreatedAt.getTime())) {
        callback(new Error('开始日期应当早于结束日期'))
      } else {
        callback()
      }
    }, trigger: 'change' }
  ],
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  elSearchFormRef.value?.validate(async(valid) => {
    if (!valid) return
    page.value = 1
    pageSize.value = 10
    if (searchInfo.value.isBest === ""){
        searchInfo.value.isBest=null
    }
    if (searchInfo.value.isMember === ""){
        searchInfo.value.isMember=null
    }
    getTableData()
  })
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getMembersList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () =>{
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
            deleteMembersFunc(row)
        })
    }


// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async() => {
      const ids = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map(item => {
          ids.push(item.ID)
        })
      const res = await deleteMembersByIds({ ids })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === ids.length && page.value > 1) {
          page.value--
        }
        deleteVisible.value = false
        getTableData()
      }
    }

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateMembersFunc = async(row) => {
    const res = await findMembers({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.remembers
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteMembersFunc = async (row) => {
    const res = await deleteMembers({ ID: row.ID })
    if (res.code === 0) {
        ElMessage({
                type: 'success',
                message: '删除成功'
            })
            if (tableData.value.length === 1 && page.value > 1) {
            page.value--
        }
        getTableData()
    }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)


// 查看详情控制标记
const detailShow = ref(false)


// 打开详情弹窗
const openDetailShow = () => {
  detailShow.value = true
}


// 打开详情
const getDetails = async (row) => {
  // 打开弹窗
  const res = await findMembers({ ID: row.ID })
  if (res.code === 0) {
    formData.value = res.data.remembers
    openDetailShow()
  }
}


// 关闭详情弹窗
const closeDetailShow = () => {
  detailShow.value = false
  formData.value = {
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
          }
}


// 打开弹窗
const openDialog = () => {
    type.value = 'create'
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
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
        }
}
// 弹窗确定
const enterDialog = async () => {
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
                closeDialog()
                getTableData()
              }
      })
}

</script>

<style>

</style>
