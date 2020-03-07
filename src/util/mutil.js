import axios from 'axios'

class MUtil {
    request(params) {
        return new Promise((resolve, reject) => {
            axios({
                method: params.type || 'get',
                url: params.url || '',
                data: params.data || null
            }).then(res => {
                res = res.data
                // 数据请求成功
                if(res.status === 0) {
                    resolve(res.data, res.msg)
                }else if(res.status === 10) { // 没有登录状态，强制登录
                    this.doLogin()
                }else {
                    reject(res.msg || res.data);
                }
                
            }).catch(err => {
                reject(err)
            }) 
        })
    }

    doLogin() {
       

    }

    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对了~~')
    }
    // 获取URL参数
    getUrlParam(name) {
        // xx.com?param=123&param2
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    //本地存储
    setStorage(name, data) {
        let dataType = typeof data
        // json对象
        if(dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data))
        }else if(['string', 'number', 'boolean'].indexOf(dataType) >= 0) { // 基础类型
            window.localStorage.setItem(name, data)
        }else { // 其他不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
     // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if(data) {
            return JSON.parse(data);
        }
        else {
            return '';
        }
    } 
     // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default MUtil;