import service from '@/utils/request'

// @Tags BadWords
// @Summary 创建bad
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BadWords true "创建bad"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /badWords/createBadWords [post]
export const createBadWords = (data) => {
  return service({
    url: '/badWords/createBadWords',
    method: 'post',
    data
  })
}

// @Tags BadWords
// @Summary 删除bad
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BadWords true "删除bad"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /badWords/deleteBadWords [delete]
export const deleteBadWords = (data) => {
  return service({
    url: '/badWords/deleteBadWords',
    method: 'delete',
    data
  })
}

// @Tags BadWords
// @Summary 批量删除bad
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除bad"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /badWords/deleteBadWords [delete]
export const deleteBadWordsByIds = (data) => {
  return service({
    url: '/badWords/deleteBadWordsByIds',
    method: 'delete',
    data
  })
}

// @Tags BadWords
// @Summary 更新bad
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.BadWords true "更新bad"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /badWords/updateBadWords [put]
export const updateBadWords = (data) => {
  return service({
    url: '/badWords/updateBadWords',
    method: 'put',
    data
  })
}

// @Tags BadWords
// @Summary 用id查询bad
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.BadWords true "用id查询bad"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /badWords/findBadWords [get]
export const findBadWords = (params) => {
  return service({
    url: '/badWords/findBadWords',
    method: 'get',
    params
  })
}

// @Tags BadWords
// @Summary 分页获取bad列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取bad列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /badWords/getBadWordsList [get]
export const getBadWordsList = (params) => {
  return service({
    url: '/badWords/getBadWordsList',
    method: 'get',
    params
  })
}
