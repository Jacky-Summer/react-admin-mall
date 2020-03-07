import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import User from 'service/user-service.js'
import MUtil from 'util/mutil.js'
import TableList from 'util/table-list/index.jsx'

const _user = new User()
const _util = new MUtil()

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true
        }
    }

    componentDidMount() {
        this.loadUserList()
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoading: false
                })
            })
        }, errMsg => {
            this.setState({
                list : []
            });
            _util.errorTips(errMsg)
        })
    }

    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList()
        })
    }

    render() {
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        })

        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads={['Id','用户名','邮箱','手机号码','注册时间']}>
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

export default UserList;