<template>
    <div>
        <div class="gva-table-box">
            <div class="gva-btn-list">
                <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
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
                <el-table-column type="selection" width="55"/>
                <el-table-column align="left" label="编号" prop="ID" width="80" sortable/>
                <el-table-column align="left" label="Banner名称" prop="name" width="200"/>
                <el-table-column align="left" label="Banner类型" width="150">
                    <template #default="scope">
                        <el-tag type="primary" v-if="scope.row.type==1">小程序</el-tag>
                        <el-tag type="success" v-if="scope.row.type==2">APP</el-tag>
                        <el-tag type="warning" v-if="scope.row.type==3">小程序弹层</el-tag>
                        <el-tag type="danger" v-if="scope.row.type==4">APP弹层</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="image" label="Banner预览" max-width="60">
                    <template #default="scope">
                        <img :src="scope.row.image" min-width="60" height="60"/>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="启用状态" prop="status" width="100">
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                        <el-tag type="danger" v-if="scope.row.status==0">禁用</el-tag>
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
                        <el-button type="primary" link icon="edit" class="table-button"
                                   @click="updateBannersFunc(scope.row)">变更
                        </el-button>
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
        <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?'添加':'修改'"
                   destroy-on-close>
            <el-scrollbar height="200px">
                <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="100px">
                    <el-form-item label="Banner名称" prop="name">
                        <el-input v-model="formData.name" :clearable="true" placeholder="请输入banner名称"/>
                    </el-form-item>
                    <el-form-item label="Banner链接" prop="image">
                        <el-input v-model="formData.image" :clearable="true" placeholder="请输入banner链接"/>
                    </el-form-item>
                    <el-form-item label="Banner类型" prop="type">
                        <el-select
                                v-model="formData.type"
                                placeholder="类型必选"
                        >
                            <el-option
                                    label="小程序"
                                    value="1"
                            />
                            <el-option
                                    label="APP"
                                    value="2"
                            />
                            <el-option
                                    label="小程序弹层"
                                    value="3"
                            />
                            <el-option
                                    label="APP弹层"
                                    value="4"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item
                            label="启用状态"
                            prop="status"
                            required
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

        <el-dialog v-model="detailShow" style="width: 800px" lock-scroll :before-close="closeDetailShow" title="查看详情"
                   destroy-on-close>
            <el-scrollbar height="200px">
                <el-descriptions column="1" border>
                    <el-descriptions-item label="Banner名称">
                        {{ formData.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Banner链接">
                        {{ formData.image }}
                    </el-descriptions-item>
                    <el-descriptions-item label="Banner类型">
                        <el-tag type="primary" v-if="formData.type==1">小程序</el-tag>
                        <el-tag type="success" v-if="formData.type==2">APP</el-tag>
                        <el-tag type="warning" v-if="formData.type==3">小程序弹层</el-tag>
                        <el-tag type="danger" v-if="formData.type==4">APP弹层</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="启用状态">
                        <el-tag type="success" v-if="formData.status==1">启用</el-tag>
                        <el-tag type="danger" v-if="formData.status==0">禁用</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>

<script setup>
    import {
        createBanners,
        deleteBanners,
        deleteBannersByIds,
        updateBanners,
        findBanners,
        getBannersList
    } from '@/api/banners'

    // 全量引入格式化工具 请按需保留
    import {getDictFunc, formatDate, formatBoolean, filterDict, ReturnArrImg, onDownloadFile} from '@/utils/format'
    import {ElMessage, ElMessageBox} from 'element-plus'
    import {ref, reactive} from 'vue'

    defineOptions({
        name: 'Banners'
    })

    // 自动化生成的字典（可能为空）以及字段
    const formData = ref({
        name: '',
        image: '',
        status: false,
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
        image: [{
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
        status: [{
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
        const table = await getBannersList({page: page.value, pageSize: pageSize.value, ...searchInfo.value})
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
            deleteBannersFunc(row)
        })
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
        const res = await deleteBannersByIds({ids})
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
    const updateBannersFunc = async (row) => {
        const res = await findBanners({ID: row.ID})
        type.value = 'update'
        if (res.code === 0) {
            formData.value = res.data.rebanners
            dialogFormVisible.value = true
        }
    }


    // 删除行
    const deleteBannersFunc = async (row) => {
        const res = await deleteBanners({ID: row.ID})
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
        const res = await findBanners({ID: row.ID})
        if (res.code === 0) {
            formData.value = res.data.rebanners
            openDetailShow()
        }
    }


    // 关闭详情弹窗
    const closeDetailShow = () => {
        detailShow.value = false
        formData.value = {
            name: '',
            image: '',
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
            name: '',
            image: '',
            status: false,
        }
    }
    // 弹窗确定
    const enterDialog = async () => {
        elFormRef.value?.validate(async (valid) => {
            if (!valid) return
            let res
            switch (type.value) {
                case 'create':
                    res = await createBanners(formData.value)
                    break
                case 'update':
                    res = await updateBanners(formData.value)
                    break
                default:
                    res = await createBanners(formData.value)
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
