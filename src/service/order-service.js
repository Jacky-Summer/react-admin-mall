import MUtil from 'util/mutil.js'

const _util = new MUtil()

class Order {
    // 获取订单列表
    getOrderList(listParam) {
        let url = ''
        const formData = new FormData()
        if(listParam.listType === 'list') {
            formData.append('pageNum', listParam.pageNum)
            url = '/manage/order/list.do'
        }else if(listParam.listType === 'search') {
            url = '/manage/order/search.do'
            formData.append('orderNo', listParam.orderNo)
        }
        return _util.request({
            type: 'post',
            url: url,
            data: formData
        })
    }

    // 加载订单详情
    getOrderDetail(orderNo) {
        const formData = new FormData()
        formData.append('orderNo', orderNo)
        return _util.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: formData
        })
    }

    // 订单发货
    sendGoods(orderNumber){
        const formData = new FormData()
        formData.append('orderNo', orderNumber)
        return _mm.request({
            type    : 'post',
            url     : '/manage/order/send_goods.do',
            data    : {
                orderNo : orderNumber
            }
        });
    }

}

export default Order