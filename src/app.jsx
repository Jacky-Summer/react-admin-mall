import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'
import Login from 'page/login/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends Component {
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>    
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/product' component={Home}></Route>
                    <Route path='/product-category' component={Home}></Route>
                    <Route path='/order' component={Home}></Route>
                    <Route path='/user/index' component={UserList}/>
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