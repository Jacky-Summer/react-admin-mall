import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MUtil from 'util/mutil.js'
import User from 'service/user-service'

const _util = new MUtil()
const _user = new User()

class NavTop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: _util.getStorage('userInfo').username
        }
    }
    // 退出登录
    onLogout() {
        _user.logout().then(res => {
            _util.removeStorage('userInfo')
            window.location.href = '/login'
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }

    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <Link className="navbar-brand" to='/'><b>MALL</b>ADMIN</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="#">
                            <i className="fa fa-user fa-fw"></i> 
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => { this.onLogout() }}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavTop