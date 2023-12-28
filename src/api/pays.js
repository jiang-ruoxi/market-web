import service from '@/utils/request'

// @Tags Pays
// @Summary 创建zmPay表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Pays true "创建zmPay表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /pays/createPays [post]
export const createPays = (data) => {
  return service({
    url: '/pays/createPays',
    method: 'post',
    data
  })
}

// @Tags Pays
// @Summary 删除zmPay表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Pays true "删除zmPay表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pays/deletePays [delete]
export const deletePays = (data) => {
  return service({
    url: '/pays/deletePays',
    method: 'delete',
    data
  })
}

// @Tags Pays
// @Summary 批量删除zmPay表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmPay表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pays/deletePays [delete]
export const deletePaysByIds = (data) => {
  return service({
    url: '/pays/deletePaysByIds',
    method: 'delete',
    data
  })
}

// @Tags Pays
// @Summary 更新zmPay表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Pays true "更新zmPay表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /pays/updatePays [put]
export const updatePays = (data) => {
  return service({
    url: '/pays/updatePays',
    method: 'put',
    data
  })
}

// @Tags Pays
// @Summary 用id查询zmPay表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Pays true "用id查询zmPay表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /pays/findPays [get]
export const findPays = (params) => {
  return service({
    url: '/pays/findPays',
    method: 'get',
    params
  })
}

// @Tags Pays
// @Summary 分页获取zmPay表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmPay表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /pays/getPaysList [get]
export const getPaysList = (params) => {
  return service({
    url: '/pays/getPaysList',
    method: 'get',
    params
  })
}
