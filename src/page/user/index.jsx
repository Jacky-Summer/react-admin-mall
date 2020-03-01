import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import User from 'service/user-service.js'
import MUtil from 'util/mutil.js'

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
        let listError = (
            <tr className="text-center">
                <td colSpan="5">
                    {this.state.firstLoading ? '正在加载数据...' : '没有找到相应的结果'}
                </td>
            </tr>
        )

        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>手机号码</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length > 0 ? listBody : listError   
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
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