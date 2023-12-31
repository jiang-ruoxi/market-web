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
        <el-table-column align="left" label="任务名称" prop="title" width="200%" :show-overflow-tooltip='true' />
          <el-table-column align="center" label="工种类型" prop="tagId" width="100">
            <template #default="scope">
              <el-tag :type="danger">{{ scope.row.tag_name }}</el-tag>
            </template>
          </el-table-column>
        <el-table-column align="left" label="任务描述" prop="desc" width="300%" :show-overflow-tooltip='true' />
        <el-table-column align="center" label="发布者" prop="userId" width="120" />
        <el-table-column align="left" label="状态" prop="status" width="120">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status==2">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.status==0">待审核</el-tag>
            <el-tag type="warning" v-if="scope.row.status==1">招聘中</el-tag>
          </template>
        </el-table-column>
          <el-table-column align="left" label="发布日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
          </el-table-column>
        <el-table-column align="left" label="操作" min-width="120">
            <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>
                查看详情
            </el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateTasksFunc(scope.row)">变更</el-button>
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
            <el-form-item label="任务名称"  prop="title" >
              <el-input v-model="formData.title" :clearable="true"  placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="任务描述"  prop="desc" >
              <el-input v-model="formData.desc" :clearable="true"  placeholder="请输入任务描述" />
            </el-form-item>
            <el-form-item label="工种类型" prop="tagId">
              <el-select v-model="formData.tagId" placeholder="请选择" style="width:100%" :clearable="true">
                <el-option v-for="item in tag_list" :key="item.ID" :label="item.name" :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布用户"  prop="userId" >
              <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入用户id" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select v-model="formData.status" placeholder="请选择" style="width:100%" :clearable="true">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="招聘中" value="1"></el-option>
                <el-option label="已完成" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作地址"  prop="address" >
              <el-input v-model="formData.address" :clearable="true"  placeholder="请输入工作地址" />
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
                <el-descriptions-item label="名称">
                        {{ formData.title }}
                </el-descriptions-item>
                <el-descriptions-item label="任务描述">
                        {{ formData.desc }}
                </el-descriptions-item>
                <el-descriptions-item label="类型id">
                        {{ formData.tagId }}
                </el-descriptions-item>
                <el-descriptions-item label="用户id">
                        {{ formData.userId }}
                </el-descriptions-item>
                <el-descriptions-item label="状态,2已完成,1招聘中,0待审核">
                    {{ formatBoolean(formData.status) }}
                </el-descriptions-item>
                <el-descriptions-item label="工作地址">
                        {{ formData.address }}
                </el-descriptions-item>
        </el-descriptions>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createTasks,
  deleteTasks,
  deleteTasksByIds,
  updateTasks,
  findTasks,
  getTasksList
} from '@/api/tasks'

import {
  getTagListAll
} from '@/api/tags'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
    name: 'Tasks'
})

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
        title: '',
        desc: '',
        tagId: '',
        userId: '',
        status: '',
        address: '',
        })


// 验证规则
const rule = reactive({
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
    if (searchInfo.value.status === ""){
        searchInfo.value.status=null
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
  const table = await getTasksList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
            deleteTasksFunc(row)
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
      const res = await deleteTasksByIds({ ids })
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
const updateTasksFunc = async(row) => {
    const res = await findTasks({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.retasks
        dialogFormVisible.value = true
    }
}

// 审核行
const verifyTasksFunc = async(row) => {
  const res = await findTasks({ ID: row.ID })
  type.value = 'verify'
  if (res.code === 0) {
    formData.value = res.data.retasks
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteTasksFunc = async (row) => {
    const res = await deleteTasks({ ID: row.ID })
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
  const res = await findTasks({ ID: row.ID })
  if (res.code === 0) {
    formData.value = res.data.retasks
    openDetailShow()
  }
}


// 关闭详情弹窗
const closeDetailShow = () => {
  detailShow.value = false
  formData.value = {
          title: '',
          desc: '',
          tagId: 0,
          userId: 0,
          status: false,
          address: '',
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
        title: '',
        desc: '',
        tagId: 0,
        userId: 0,
        status: false,
        address: '',
        }
}
// 弹窗确定
const enterDialog = async () => {
     elFormRef.value?.validate( async (valid) => {
             if (!valid) return
              let res
              switch (type.value) {
                case 'create':
                  res = await createTasks(formData.value)
                  break
                case 'update':
                  res = await updateTasks(formData.value)
                  break
                default:
                  res = await createTasks(formData.value)
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


//初始化下拉选择项
const tag_list = ref();
const getTagListData = async () => {
  const res = await getTagListAll();
  if (res.code === 0) {
    tag_list.value = res.data.list;
  }
};
getTagListData();
</script>

<style>

</style>
