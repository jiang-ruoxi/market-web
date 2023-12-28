import service from '@/utils/request'

// @Tags Banners
// @Summary 创建zm_banner表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Banners true "创建zm_banner表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /banners/createBanners [post]
export const createBanners = (data) => {
  return service({
    url: '/banners/createBanners',
    method: 'post',
    data
  })
}

// @Tags Banners
// @Summary 删除zm_banner表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Banners true "删除zm_banner表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /banners/deleteBanners [delete]
export const deleteBanners = (data) => {
  return service({
    url: '/banners/deleteBanners',
    method: 'delete',
    data
  })
}

// @Tags Banners
// @Summary 批量删除zm_banner表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除zm_banner表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /banners/deleteBanners [delete]
export const deleteBannersByIds = (data) => {
  return service({
    url: '/banners/deleteBannersByIds',
    method: 'delete',
    data
  })
}

// @Tags Banners
// @Summary 更新zm_banner表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.Banners true "更新zm_banner表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /banners/updateBanners [put]
export const updateBanners = (data) => {
  return service({
    url: '/banners/updateBanners',
    method: 'put',
    data
  })
}

// @Tags Banners
// @Summary 用id查询zm_banner表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.Banners true "用id查询zm_banner表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /banners/findBanners [get]
export const findBanners = (params) => {
  return service({
    url: '/banners/findBanners',
    method: 'get',
    params
  })
}

// @Tags Banners
// @Summary 分页获取zm_banner表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取zm_banner表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /banners/getBannersList [get]
export const getBannersList = (params) => {
  return service({
    url: '/banners/getBannersList',
    method: 'get',
    params
  })
}
