<template>
    <div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
            </div>
            <el-table
                    ref="multipleTable"
                    style="width: 100%"
                    tooltip-effect="dark"
                    :data="tableData"
                    row-key="ID"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column align="left" label="编号" prop="ID" width="80" sortable/>
                <el-table-column align="center" label="价位名称" prop="name" width="120"/>
                <el-table-column align="center" label="现价(元)" prop="cPrice" width="120"/>
                <el-table-column align="center" label="原价(元)" prop="oPrice" width="120"/>
                <el-table-column align="center" label="有效天数" prop="number" width="120"/>
                <el-table-column align="center" label="赠送天数" prop="numberExt" width="120"/>
                <el-table-column align="center" label="启用状态" prop="status" width="100">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                        <el-tag type="warning" v-if="scope.row.status==0">禁用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="类型" prop="type" width="100">
                    <template #default="scope">
                        <el-tag type="danger" v-if="scope.row.type==1">会员付费</el-tag>
                        <el-tag type="primary" v-if="scope.row.type==2">开通工匠</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="默认状态" prop="enable" width="100">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.checked==1">默认选中</el-tag>
                        <el-tag type="info" v-if="scope.row.checked==0">非选中</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="排序(倒序)" prop="sort" width="120"/>
                <el-table-column align="center" label="创建日期" width="180">
                    <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
                </el-table-column>
                <el-table-column align="left" label="操作" min-width="120">
                    <template #default="scope">
                        <el-button type="primary" link icon="edit" class="table-button"
                                   @click="updatePaysFunc(scope.row)">变更
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
        <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?'添加':'修改'"
                   destroy-on-close>
            <el-scrollbar height="500px">
                <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formData.name" :clearable="true" placeholder="请输入名称"/>
                    </el-form-item>
                    <el-form-item
                            label="默认状态"
                            prop="checked"
                    >
                        <el-switch
                                v-model="formData.checked"
                                active-text="默认选中"
                        />
                    </el-form-item>
                    <el-form-item label="现价" prop="cPrice">
                        <el-input-number v-model="formData.cPrice" style="width:100%" placeholder="请输入有效现价"
                                         :clearable="true"/>
                    </el-form-item>
                    <el-form-item label="原价" prop="oPrice">
                        <el-input-number v-model="formData.oPrice" style="width:100%" :clearable="true"/>
                    </el-form-item>
                    <el-form-item label="有效天数" prop="number">
                        <el-input v-model.number="formData.number" :clearable="true" placeholder="请输入有效天数"/>
                    </el-form-item>
                    <el-form-item label="赠送天数" prop="numberExt">
                        <el-input v-model.number="formData.numberExt" :clearable="true" placeholder="请输入赠送天数"/>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入顺序"/>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select v-model="formData.type" placeholder="请选择" style="width:100%" :clearable="true">
                            <el-option label="会员付费" value="1"></el-option>
                            <el-option label="开通工匠" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            label="启用状态"
                            prop="status"
                    >
                        <el-switch
                                v-model="formData.status"
                                active-text="开启"
                        />
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
    </div>
</template>

<script setup>
    import {
        createPays,
        updatePays,
        findPays,
        getPaysList
    } from '@/api/pays'

    // 全量引入格式化工具 请按需保留
    import {getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile} from '@/utils/format'
    import {ElMessage, ElMessageBox} from 'element-plus'
    import {ref, reactive} from 'vue'

    defineOptions({
        name: 'Pays'
    })

    // 自动化生成的字典（可能为空）以及字段
    const formData = ref({
        name: '',
        oPrice: 0,
        number: 0,
        numberExt: 0,
        sort: 999,
        checked: 0,
        status: true,
    })


    // 验证规则
    const rule = reactive({
        name: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
            {
                whitespace: true,
                message: '不能只输入空格',
                trigger: ['input', 'blur'],
            }
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
        sort: [{
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
        checked: [{
            required: true,
            message: '',
            trigger: ['input', 'blur'],
        },
        ], status: [{
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
        const table = await getPaysList({page: page.value, pageSize: pageSize.value, ...searchInfo.value})
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


    // 批量删除控制标记
    const deleteVisible = ref(false)


    // 行为控制标记（弹窗内部需要增还是改）
    const type = ref('')

    // 更新行
    const updatePaysFunc = async (row) => {
        const res = await findPays({ID: row.ID})
        type.value = 'update'
        if (res.code === 0) {
            formData.value = res.data.repays
            dialogFormVisible.value = true
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


    // 关闭详情弹窗
    const closeDetailShow = () => {
        detailShow.value = false
        formData.value = {
            name: '',
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
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
            name: '',
            cPrice: 0,
            oPrice: 0,
            number: 0,
            numberExt: 0,
        }
    }
    // 弹窗确定
    const enterDialog = async () => {
        elFormRef.value?.validate(async (valid) => {
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
                closeDialog()
                getTableData()
            }
        })
    }

</script>

<style>

</style>
