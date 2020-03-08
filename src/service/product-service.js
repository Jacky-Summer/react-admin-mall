import MUtil from 'util/mutil.js'

const _util = new MUtil()

class Product {
    // 获取商品列表
    getProductList(listParam){
        let formData = new FormData(),
            url = ''
        if(listParam.listType === 'search') {
            url = '/manage/product/search.do'
            formData.append(listParam.searchType, listParam.searchKeyword)
        }else {
            url = '/manage/product/list.do'
        }

        formData.append('pageNum', listParam.pageNum)
        return _util.request({
            type: 'post',
            url: url,
            data: formData
        })
    }

    // 改变商品销售状态
    setProductStatus(productInfo) {
        const formData = new FormData()
        formData.append('productId', productInfo.productId)
        formData.append('status', productInfo.status)
        return _util.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: formData
        })
    }

    // 根据父品类id获取品类列表
    getCategoryList(parentCategoryId){
        const formData = new FormData()
        formData.append('categoryId', parentCategoryId || 0)
        return _util.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: formData
        })
    }
    // 检查保存商品的表单数据
    checkProduct(product) {
        let result = {
            status: true,
            msg: '验证通过'
        }
        if(typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        if(typeof product.categoryId !== 'number' || product.categoryId <= 0) {
            return {
                status: false,
                msg: '商品分类不能为空！'
            }
        }
        if(typeof product.price !== 'number' || product.price <= 0) {
            return {
                status: false,
                msg: '商品价格不能为空！'
            }
        }
        if(typeof product.stock !== 'number' || product.stock.length <= 0) {
            return {
                status: false,
                msg: '商品库存不能为空！'
            }
        }
        return result
    }   
    // 保存商品
    saveProduct(product) {
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('subtitle', product.subtitle)
        formData.append('categoryId', product.categoryId)
        formData.append('price', product.price)
        formData.append('stock', product.stock)
        formData.append('subImages', product.subImages)
        formData.append('detail', product.detail)
        if(product.id) {
            formData.append('id', product.id)
        }
        return _util.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: formData
        })
    }

    // 加载商品详情
    getProduct(id) {
        const formData = new FormData()
        formData.append('productId', id)
        return _util.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: formData
        })
    }

    // 修改品类名称
    updateCategoryName(category) {
        const formData = new FormData()
        formData.append('categoryId', category.categoryId)
        formData.append('categoryName', category.categoryName)
        return _util.request({
            type: 'post',
            url: '/manage/category/set_category_name.do',
            data: formData
        })
    }

    // 新增品类
    saveCategory(category) {
        const formData = new FormData()
        formData.append('categoryName', category.categoryName)
        formData.append('parentId', category.parentId)
        return _util.request({
            type: 'post',
            url: '/manage/category/add_category.do',
            data: formData
        })
    }
}

export default Product