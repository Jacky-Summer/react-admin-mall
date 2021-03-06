import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'
import ProductRouter from 'page/product/router.jsx'
import OrderList from 'page/order/index.jsx'
import OrderDetail from 'page/order/detail.jsx'

class App extends Component {
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>    
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/product' component={ProductRouter}></Route>
                    <Route path='/product-category' component={ProductRouter}></Route>
                    <Route path='/order/index' component={OrderList}></Route>
                    <Route path='/order/detail/:id' component={OrderDetail}></Route>
                    <Route path='/user/index' component={UserList}/>
                    <Redirect exact from='/order' to='/order/index'/>
                    <Redirect exact from='/user' to='/user/index'/>
                    <Route component={ErrorPage}></Route>
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' render={ props => LayoutRouter}></Route>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)