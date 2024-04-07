import service from '@/utils/request'

// @Tags Address
// @Summary 创建zmAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Address true "创建zmAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /zmAddress/createAddress [post]
export const createAddress = (data) => {
  return service({
    url: '/zmAddress/createAddress',
    method: 'post',
    data
  })
}

// @Tags Address
// @Summary 删除zmAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Address true "删除zmAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zmAddress/deleteAddress [delete]
export const deleteAddress = (data) => {
  return service({
    url: '/zmAddress/deleteAddress',
    method: 'delete',
    data
  })
}

// @Tags Address
// @Summary 批量删除zmAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zmAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zmAddress/deleteAddress [delete]
export const deleteAddressByIds = (data) => {
  return service({
    url: '/zmAddress/deleteAddressByIds',
    method: 'delete',
    data
  })
}

// @Tags Address
// @Summary 更新zmAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Address true "更新zmAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /zmAddress/updateAddress [put]
export const updateAddress = (data) => {
  return service({
    url: '/zmAddress/updateAddress',
    method: 'put',
    data
  })
}

// @Tags Address
// @Summary 用id查询zmAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Address true "用id查询zmAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /zmAddress/findAddress [get]
export const findAddress = (params) => {
  return service({
    url: '/zmAddress/findAddress',
    method: 'get',
    params
  })
}

// @Tags Address
// @Summary 分页获取zmAddress表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmAddress表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zmAddress/getAddressList [get]
export const getAddressList = (params) => {
  return service({
    url: '/zmAddress/getAddressList',
    method: 'get',
    params
  })
}

// @Tags Address
// @Summary 分页获取zmAddress表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zmAddress表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zmAddress/getAddressAllList [get]
export const getAddressAllList = (params) => {
  return service({
    url: '/zmAddress/getAddressAllList',
    method: 'get',
    params
  })
}
