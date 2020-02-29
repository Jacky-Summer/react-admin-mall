import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from 'page/home/index.jsx'
import Layout from 'component/layout/index.jsx'

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>    
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/product' component={Home}></Route>
                        <Route path='/product-category' component={Home}></Route>
                        <Route path='/order' component={Home}></Route>
                        <Route path='/user' component={Home}></Route>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)