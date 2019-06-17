import request from '../utils/request'

{/* <商品管理> */}
// 获取商品列表、筛选商品
export async function getProductList(params) {
  return request("POST", "api/admin/getProductList", params)
}

// 添加或更新商品信息
export async function addOrUpdateProduct(params) {
  return request("POST", "api/admin/addOrUpdateProduct", params)
}

// 获取商品详情
export async function getProductDetail(params) {
  return request("POST", "api/admin/getProductDetail", params)
}

// 修改商品上下架状态
export async function updateProductStatus(params) {
  return request("POST", "api/admin/updateProductStatus", params)
}

export async function searchProduct(params) {
  return request("POST", "api/admin/searchProduct", params)
}

{/* <品类管理> */}
// 获取总品类列表
export async function getCategoryList(params) {
  return request("POST", "api/admin/getCategoryList", params)
}
// 获取总品类子品类列表
export async function getCategoryChildrenList(params) {
  return request("POST", "api/admin/getCategoryChildrenList", params)
}
// 添加品类信息
export async function addCategory(params) {
  return request("POST", "api/admin/addCategory", params)
}
// 获取品类信息
export async function getCategoryDetail(params) {
  return request("POST", "api/admin/getCategoryDetail", params)
}
// 更新品类信息
export async function updateCategory(params) {
  return request("POST", "api/admin/updateCategory", params)
}
// 更新品类状态信息
export async function updataCategoryStatus(params) {
  return request("POST", "api/admin/updataCategoryStatus", params)
}
// 删除品类信息
export async function deleteCategory(params) {
  return request("POST", "api/admin/deleteCategory", params)
}
