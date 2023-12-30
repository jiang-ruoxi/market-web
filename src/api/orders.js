import service from '@/utils/request'

// @Tags Orders
// @Summary 创建zmOrder表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Orders true "创建zmOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /orders/createOrders [post]
export const createOrders = (data) => {
  return service({
    url: '/orders/createOrders',
    method: 'post',
    data
  })
}

// @Tags Orders
// @Summary 删除zmOrder表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Orders true "删除zmOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /orders/deleteOrders [delete]
export const deleteOrders = (data) => {
  return service({
    url: '/orders/deleteOrders',
    method: 'delete',
    data
  })
}

// @Tags Orders
// @Summary 批量删除zmOrder表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /orders/deleteOrders [delete]
export const deleteOrdersByIds = (data) => {
  return service({
    url: '/orders/deleteOrdersByIds',
    method: 'delete',
    data
  })
}

// @Tags Orders
// @Summary 更新zmOrder表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Orders true "更新zmOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /orders/updateOrders [put]
export const updateOrders = (data) => {
  return service({
    url: '/orders/updateOrders',
    method: 'put',
    data
  })
}

// @Tags Orders
// @Summary 用id查询zmOrder表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Orders true "用id查询zmOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /orders/findOrders [get]
export const findOrders = (params) => {
  return service({
    url: '/orders/findOrders',
    method: 'get',
    params
  })
}

// @Tags Orders
// @Summary 分页获取zmOrder表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmOrder表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /orders/getOrdersList [get]
export const getOrdersList = (params) => {
  return service({
    url: '/orders/getOrdersList',
    method: 'get',
    params
  })
}
