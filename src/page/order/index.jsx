import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Order from 'service/order-service.js'
import MUtil from 'util/mutil.js'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import ListSearch from 'page/order/index-list-search.jsx'

const _order = new Order()
const _util = new MUtil()

class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }

    componentDidMount() {
        this.loadOrderList()
    }
    // 加载订单列表
    loadOrderList() {
        let listParam = {}
        listParam.pageNum = this.state.pageNum
        listParam.listType = this.state.listType
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNo
        }
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list : []
            });
            _util.errorTips(errMsg)
        })
    }
    // 点击搜索按钮的时候
    onSearch(orderNo) {
        let listType = orderNo === '' ? 'list': 'search'
        this.setState({
            pageNum: this.state.pageNum,
            listType: listType,
            orderNo: orderNo
        }, () => {
            this.loadOrderList()
        })
    }

    // 改变页数
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList()
        })
    }

    render() {
        let tableHeads = [
            { name: '订单号', width: '25%' },
            { name: '收件人', width: '15%' },
            { name: '订单状态', width: '10%' },
            { name: '订单总价', width: '15%' },
            { name: '创建时间', width: '25%' },
            { name: '操作', width: '10%' }
        ]

        let listBody = this.state.list.map((order, index) => {
            return (
                <tr key={index}>
                    <td>{order.orderNo}</td>
                    <td>{order.receiverName}</td>
                    <td>{order.statusDesc}</td>
                    <td>￥{order.payment}</td>
                    <td>{order.createTime}</td>
                    <td>
                        <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                    </td>
                </tr>
            )
        })

        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表"/>
                <ListSearch onSearch={ (orderNo) => {this.onSearch(orderNo)}}/>
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}
                />
            </div>
        );
    }
}

export default OrderList;