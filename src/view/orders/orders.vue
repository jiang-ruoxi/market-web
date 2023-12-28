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
        <el-form-item label="用户id" prop="userId">
            
             <el-input v-model.number="searchInfo.userId" placeholder="搜索条件" />

        </el-form-item>
        <el-form-item label="订单" prop="orderId">
            
             <el-input v-model.number="searchInfo.orderId" placeholder="搜索条件" />

        </el-form-item>
            <el-form-item label="类型,1普通会员,2优选工匠,3积分兑换" prop="type">
            <el-select v-model="searchInfo.type" clearable placeholder="请选择">
                <el-option
                    key="true"
                    label="是"
                    value="true">
                </el-option>
                <el-option
                    key="false"
                    label="否"
                    value="false">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="支付状态,1支付完成,0待支付" prop="status">
            <el-select v-model="searchInfo.status" clearable placeholder="请选择">
                <el-option
                    key="true"
                    label="是"
                    value="true">
                </el-option>
                <el-option
                    key="false"
                    label="否"
                    value="false">
                </el-option>
            </el-select>
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
        <el-table-column align="left" label="日期" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="用户id" prop="userId" width="120" />
        <el-table-column align="left" label="订单" prop="orderId" width="120" />
        <el-table-column align="left" label="类型,1普通会员,2优选工匠,3积分兑换" prop="type" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column align="left" label="现价" prop="cPrice" width="120" />
        <el-table-column align="left" label="原价" prop="oPrice" width="120" />
        <el-table-column align="left" label="有效天数" prop="number" width="120" />
        <el-table-column align="left" label="赠送天数" prop="numberExt" width="120" />
        <el-table-column align="left" label="支付状态,1支付完成,0待支付" prop="status" width="120">
            <template #default="scope">{{ formatBoolean(scope.row.status) }}</template>
        </el-table-column>
        <el-table-column align="left" label="操作" min-width="120">
            <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>
                查看详情
            </el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateOrdersFunc(scope.row)">变更</el-button>
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
            <el-form-item label="用户id:"  prop="userId" >
              <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入用户id" />
            </el-form-item>
            <el-form-item label="订单:"  prop="orderId" >
              <el-input v-model.number="formData.orderId" :clearable="true" placeholder="请输入订单" />
            </el-form-item>
            <el-form-item label="类型,1普通会员,2优选工匠,3积分兑换:"  prop="type" >
              <el-switch v-model="formData.type" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
            </el-form-item>
            <el-form-item label="现价:"  prop="cPrice" >
              <el-input v-model.number="formData.cPrice" :clearable="true" placeholder="请输入现价" />
            </el-form-item>
            <el-form-item label="原价:"  prop="oPrice" >
              <el-input v-model.number="formData.oPrice" :clearable="true" placeholder="请输入原价" />
            </el-form-item>
            <el-form-item label="有效天数:"  prop="number" >
              <el-input v-model.number="formData.number" :clearable="true" placeholder="请输入有效天数" />
            </el-form-item>
            <el-form-item label="赠送天数:"  prop="numberExt" >
              <el-input v-model.number="formData.numberExt" :clearable="true" placeholder="请输入赠送天数" />
            </el-form-item>
            <el-form-item label="支付状态,1支付完成,0待支付:"  prop="status" >
              <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
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
                <el-descriptions-item label="用户id">
                        {{ formData.userId }}
                </el-descriptions-item>
                <el-descriptions-item label="订单">
                        {{ formData.orderId }}
                </el-descriptions-item>
                <el-descriptions-item label="类型,1普通会员,2优选工匠,3积分兑换">
                    {{ formatBoolean(formData.type) }}
                </el-descriptions-item>
                <el-descriptions-item label="现价">
                        {{ formData.cPrice }}
                </el-descriptions-item>
                <el-descriptions-item label="原价">
                        {{ formData.oPrice }}
                </el-descriptions-item>
                <el-descriptions-item label="有效天数">
                        {{ formData.number }}
                </el-descriptions-item>
                <el-descriptions-item label="赠送天数">
                        {{ formData.numberExt }}
                </el-descriptions-item>
                <el-descriptions-item label="支付状态,1支付完成,0待支付">
                    {{ formatBoolean(formData.status) }}
                </el-descriptions-item>
        </el-descriptions>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createOrders,
  deleteOrders,
  deleteOrdersByIds,
  updateOrders,
  findOrders,
  getOrdersList
} from '@/api/orders'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
    name: 'Orders'
})

// 自动化生成的字典（可能为空）以及字段
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
               },
              ],
               orderId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               type : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               cPrice : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               oPrice : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               number : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               numberExt : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
              ],
               status : [{
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
    if (searchInfo.value.type === ""){
        searchInfo.value.type=null
    }
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
  const table = await getOrdersList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
            deleteOrdersFunc(row)
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
      const res = await deleteOrdersByIds({ ids })
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
const updateOrdersFunc = async(row) => {
    const res = await findOrders({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data.reorders
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteOrdersFunc = async (row) => {
    const res = await deleteOrders({ ID: row.ID })
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
  const res = await findOrders({ ID: row.ID })
  if (res.code === 0) {
    formData.value = res.data.reorders
    openDetailShow()
  }
}


// 关闭详情弹窗
const closeDetailShow = () => {
  detailShow.value = false
  formData.value = {
          userId: 0,
          orderId: 0,
          type: false,
          cPrice: 0,
          oPrice: 0,
          number: 0,
          numberExt: 0,
          status: false,
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
        userId: 0,
        orderId: 0,
        type: false,
        cPrice: 0,
        oPrice: 0,
        number: 0,
        numberExt: 0,
        status: false,
        }
}
// 弹窗确定
const enterDialog = async () => {
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
                closeDialog()
                getTableData()
              }
      })
}

</script>

<style>

</style>
