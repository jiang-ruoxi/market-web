import service from '@/utils/request'

// @Tags Tasks
// @Summary 创建zmTask表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tasks true "创建zmTask表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /tasks/createTasks [post]
export const createTasks = (data) => {
  return service({
    url: '/tasks/createTasks',
    method: 'post',
    data
  })
}

// @Tags Tasks
// @Summary 删除zmTask表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tasks true "删除zmTask表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /tasks/deleteTasks [delete]
export const deleteTasks = (data) => {
  return service({
    url: '/tasks/deleteTasks',
    method: 'delete',
    data
  })
}

// @Tags Tasks
// @Summary 批量删除zmTask表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmTask表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /tasks/deleteTasks [delete]
export const deleteTasksByIds = (data) => {
  return service({
    url: '/tasks/deleteTasksByIds',
    method: 'delete',
    data
  })
}

// @Tags Tasks
// @Summary 更新zmTask表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Tasks true "更新zmTask表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /tasks/updateTasks [put]
export const updateTasks = (data) => {
  return service({
    url: '/tasks/updateTasks',
    method: 'put',
    data
  })
}

// @Tags Tasks
// @Summary 用id查询zmTask表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Tasks true "用id查询zmTask表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /tasks/findTasks [get]
export const findTasks = (params) => {
  return service({
    url: '/tasks/findTasks',
    method: 'get',
    params
  })
}

// @Tags Tasks
// @Summary 分页获取zmTask表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmTask表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /tasks/getTasksList [get]
export const getTasksList = (params) => {
  return service({
    url: '/tasks/getTasksList',
    method: 'get',
    params
  })
}
