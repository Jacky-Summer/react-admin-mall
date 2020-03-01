import React, { Component } from 'react'
import './index.scss'
import User from 'service/user-service.js'
import MUtil from 'util/mutil.js'

const _util = new MUtil()
const _user = new User()

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: _util.getUrlParam('redirect') || '/'
        }
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name
        this.setState({
            [inputName]: inputValue
        })
    }

    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit()
        }
    }

    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo)
        if(checkResult.status) {
            const formData = new FormData(); // 以FormData形式提交数据
            formData.append('username', loginInfo.username)
            formData.append('password', loginInfo.password)
            _user.login(formData).then(res => {
                _util.setStorage('userInfo', res)
                this.props.history.push(this.state.redirect)
            }).catch(errMsg => {
                _util.errorTips(errMsg)
            })
        }else {
            _util.errorTips(checkResult.msg)
        }
        
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4 login-panel">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">欢迎登录 - MALL ADMIN</h3>
                    </div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">用户名</label>
                                <input 
                                    name="username"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="请输入你的用户名" 
                                    onChange={e => this.onInputChange(e)}
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">密码</label>
                                <input 
                                    name="password"
                                    type="password" 
                                    className="form-control" 
                                    placeholder="请输入你的密码" 
                                    onChange={e => this.onInputChange(e)}
                                    onKeyUp={e => this.onInputKeyUp(e)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={e => this.onSubmit(e)}>登录</button>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}


export default Login