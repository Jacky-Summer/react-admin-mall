import MUtil from 'util/mutil.js'

const _util = new MUtil()

class User {
    // 用户登录
    login(loginInfo) {
        return _util.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }
     // 检查登录接口的数据是不是合法
    checkLoginInfo(loginInfo){
        let username = loginInfo.username.replace(/\s+/g, ""),
            password = loginInfo.password.replace(/\s+/g, "")
        if(typeof username === 'string' && username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }else if(typeof password === 'string' && password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空'
            }
        }else {
            return {
                status: true,
                msg: '验证通过'
            }
        }
    }
    // 退出登录
    logout() {
        return _util.request({
            type: 'post',
            url: '/user/logout.do'
        })
    } 

    getUserList(pageNum) {

        const formData = new FormData()
        formData.append('pageNum', pageNum)
        return _util.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: formData
        })
    }

}

export default User