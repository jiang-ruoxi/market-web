import service from '@/utils/request'

// @Tags Members
// @Summary 创建zmUser表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Members true "创建zmUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /members/createMembers [post]
export const createMembers = (data) => {
  return service({
    url: '/members/createMembers',
    method: 'post',
    data
  })
}

// @Tags Members
// @Summary 删除zmUser表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Members true "删除zmUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /members/deleteMembers [delete]
export const deleteMembers = (data) => {
  return service({
    url: '/members/deleteMembers',
    method: 'delete',
    data
  })
}

// @Tags Members
// @Summary 批量删除zmUser表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /members/deleteMembers [delete]
export const deleteMembersByIds = (data) => {
  return service({
    url: '/members/deleteMembersByIds',
    method: 'delete',
    data
  })
}

// @Tags Members
// @Summary 更新zmUser表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Members true "更新zmUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /members/updateMembers [put]
export const updateMembers = (data) => {
  return service({
    url: '/members/updateMembers',
    method: 'put',
    data
  })
}

// @Tags Members
// @Summary 用id查询zmUser表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Members true "用id查询zmUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /members/findMembers [get]
export const findMembers = (params) => {
  return service({
    url: '/members/findMembers',
    method: 'get',
    params
  })
}

// @Tags Members
// @Summary 分页获取zmUser表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmUser表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /members/getMembersList [get]
export const getMembersList = (params) => {
  return service({
    url: '/members/getMembersList',
    method: 'get',
    params
  })
}
