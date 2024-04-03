<template>
    <div>
        <div class="gva-search-box">
            <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline"
                     :rules="searchRule" @keyup.enter="onSubmit">
                <el-form-item label="创建日期" prop="createdAt">
                    <template #label>
        <span>
          创建日期
          <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
            <el-icon><QuestionFilled/></el-icon>
          </el-tooltip>
        </span>
                    </template>
                    <el-date-picker v-model="searchInfo.startCreatedAt" type="datetime" placeholder="开始日期"
                                    :disabled-date="time=> searchInfo.endCreatedAt ? time.getTime() > searchInfo.endCreatedAt.getTime() : false"></el-date-picker>
                    —
                    <el-date-picker v-model="searchInfo.endCreatedAt" type="datetime" placeholder="结束日期"
                                    :disabled-date="time=> searchInfo.startCreatedAt ? time.getTime() < searchInfo.startCreatedAt.getTime() : false"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button icon="refresh" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-popover v-model:visible="deleteVisible" :disabled="!multipleSelection.length" placement="top"
                            width="160">
                    <p>确定要删除吗？</p>
                    <div style="text-align: right; margin-top: 8px;">
                        <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
                        <el-button type="primary" @click="onDelete">确定</el-button>
                    </div>
                    <template #reference>
                        <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length"
                                   @click="deleteVisible = true">删除
                        </el-button>
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
                <el-table-column align="center" label="订单ID" prop="orderId" width="150"/>
                <el-table-column align="center" label="用户ID" prop="userId" width="120"/>
                <el-table-column align="center" label="订单名称" prop="name" width="120"/>
                <el-table-column align="center" label="支付金额(元)" prop="cPrice" width="120"/>
                <el-table-column align="center" label="支付流水号" prop="paymentNumber" :show-overflow-tooltip='true'
                                 width="200"/>
                <el-table-column align="center" label="有效天数" prop="number" width="80"/>
                <el-table-column align="center" label="赠送天数" prop="numberExt" width="80"/>
                <el-table-column align="center" label="类型" prop="type" width="100">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.type==1">开通会员</el-tag>
                        <el-tag type="primary" v-if="scope.row.type==2">入驻工匠</el-tag>
                        <el-tag type="warning" v-if="scope.row.type==3">积分兑换</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="支付日期" width="160">
                    <template #default="scope">{{ formatDate(scope.row.payTime) }}</template>
                </el-table-column>
                <el-table-column align="center" label="支付状态" prop="status" width="100">
                    <template #default="scope">
                        <el-tag type="warning" v-if="scope.row.status==0">待支付</el-tag>
                        <el-tag type="success" v-if="scope.row.status==1">已支付</el-tag>
                        <el-tag type="danger" v-if="scope.row.status < 0">已取消</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="操作" min-width="120">
                    <template #default="scope">
                        <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
                            <el-icon style="margin-right: 5px">
                                <InfoFilled/>
                            </el-icon>
                            查看详情
                        </el-button>
                        <el-button type="warning" v-if="scope.row.status == 1" link icon="el-icon"
                                   @click="refundRow(scope.row)">退费
                        </el-button>
                        <el-button type="primary" v-if="scope.row.status < 1" link icon="delete"
                                   @click="deleteRow(scope.row)">删除
                        </el-button>
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
        <el-dialog v-model="detailShow" style="width: 800px" lock-scroll :before-close="closeDetailShow" title="查看详情"
                   destroy-on-close>
            <el-scrollbar height="370px">
                <el-descriptions column="1" border>
                    <el-descriptions-item label="用户ID">
                        {{ formData.userId }}
                    </el-descriptions-item>
                    <el-descriptions-item label="订单ID">
                        {{ formData.orderId }}
                    </el-descriptions-item>
                    <el-descriptions-item label="类型">
                        <el-tag type="success" v-if="formData.type==1">开通会员</el-tag>
                        <el-tag type="primary" v-if="formData.type==2">入驻工匠</el-tag>
                        <el-tag type="warning" v-if="formData.type==3">积分兑换</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="现价（元）">
                        {{ formData.cPrice }}
                    </el-descriptions-item>
                    <el-descriptions-item label="原价（元）">
                        {{ formData.oPrice }}
                    </el-descriptions-item>
                    <el-descriptions-item label="有效天数">
                        {{ formData.number }}
                    </el-descriptions-item>
                    <el-descriptions-item label="赠送天数">
                        {{ formData.numberExt }}
                    </el-descriptions-item>
                    <el-descriptions-item label="支付状态">
                        <el-tag type="warning" v-if="formData.status==0">待支付</el-tag>
                        <el-tag type="success" v-if="formData.status==1">已支付</el-tag>
                        <el-tag type="danger" v-if="formData.status < 0">已取消</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="支付时间">
                        {{ formatDate(formData.payTime) }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script setup>
    import {
        deleteOrders,
        deleteOrdersByIds,
        findOrders,
        getOrdersList,
        refundOrders
    } from '@/api/orders'

    // 全量引入格式化工具 请按需保留
    import {getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile} from '@/utils/format'
    import {ElMessage, ElMessageBox} from 'element-plus'
    import {ref, reactive} from 'vue'

    defineOptions({
        name: 'Orders'
    })

    // 自动化生成的字典（可能为空）以及字段
    const formData = ref({
        userId: 0,
        orderId: 0,
        cPrice: 0,
        oPrice: 0,
        number: 0,
        numberExt: 0,
        status: false,
        payTime: new Date(),
    })


    // 验证规则
    const rule = reactive({
        userId: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        orderId: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        type: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        cPrice: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        number: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        status: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
        payTime: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ],
    })

    const searchRule = reactive({
        createdAt: [
            {
                validator: (rule, value, callback) => {
                    if (searchInfo.value.startCreatedAt && !searchInfo.value.endCreatedAt) {
                        callback(new Error('请填写结束日期'))
                    } else if (!searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt) {
                        callback(new Error('请填写开始日期'))
                    } else if (searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt && (searchInfo.value.startCreatedAt.getTime() === searchInfo.value.endCreatedAt.getTime() || searchInfo.value.startCreatedAt.getTime() > searchInfo.value.endCreatedAt.getTime())) {
                        callback(new Error('开始日期应当早于结束日期'))
                    } else {
                        callback()
                    }
                }, trigger: 'change'
            }
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
        elSearchFormRef.value?.validate(async (valid) => {
            if (!valid) return
            page.value = 1
            pageSize.value = 10
            if (searchInfo.value.status === "") {
                searchInfo.value.status = null
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
    const getTableData = async () => {
        const table = await getOrdersList({page: page.value, pageSize: pageSize.value, ...searchInfo.value})
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
    const setOptions = async () => {
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

    //退费
    const refundRow = (row) => {
        ElMessageBox.confirm('确定要进行退费操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            refundOrdersFunc(row)
        })
    }

    // 退费行
    const refundOrdersFunc = async (row) => {
        const res = await refundOrders({ID: row.ID})
        if (res.code === 0) {
            ElMessage({
                type: 'success',
                message: '退费成功'
            })
            getTableData()
        }
    }

    // 批量删除控制标记
    const deleteVisible = ref(false)

    // 多选删除
    const onDelete = async () => {
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
        const res = await deleteOrdersByIds({ids})
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


    // 删除行
    const deleteOrdersFunc = async (row) => {
        const res = await deleteOrders({ID: row.ID})
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
        const res = await findOrders({ID: row.ID})
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
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
            status: false,
            payTime: new Date(),
        }
    }


    // 关闭弹窗
    const closeDialog = () => {
        dialogFormVisible.value = false
        formData.value = {
            userId: 0,
            orderId: 0,
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
            status: false,
            payTime: new Date(),
        }
    }

</script>

<style>

</style>
