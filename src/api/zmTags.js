import service from '@/utils/request'

// @Tags ZmTags
// @Summary 创建zmTags表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZmTags true "创建zmTags表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /zmTags/createZmTags [post]
export const createZmTags = (data) => {
  return service({
    url: '/zmTags/createZmTags',
    method: 'post',
    data
  })
}

// @Tags ZmTags
// @Summary 删除zmTags表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZmTags true "删除zmTags表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zmTags/deleteZmTags [delete]
export const deleteZmTags = (data) => {
  return service({
    url: '/zmTags/deleteZmTags',
    method: 'delete',
    data
  })
}

// @Tags ZmTags
// @Summary 批量删除zmTags表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmTags表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zmTags/deleteZmTags [delete]
export const deleteZmTagsByIds = (data) => {
  return service({
    url: '/zmTags/deleteZmTagsByIds',
    method: 'delete',
    data
  })
}

// @Tags ZmTags
// @Summary 更新zmTags表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZmTags true "更新zmTags表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /zmTags/updateZmTags [put]
export const updateZmTags = (data) => {
  return service({
    url: '/zmTags/updateZmTags',
    method: 'put',
    data
  })
}

// @Tags ZmTags
// @Summary 用id查询zmTags表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ZmTags true "用id查询zmTags表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /zmTags/findZmTags [get]
export const findZmTags = (params) => {
  return service({
    url: '/zmTags/findZmTags',
    method: 'get',
    params
  })
}

// @Tags ZmTags
// @Summary 分页获取zmTags表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmTags表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zmTags/getZmTagsList [get]
export const getZmTagsList = (params) => {
  return service({
    url: '/zmTags/getZmTagsList',
    method: 'get',
    params
  })
}
