import React, { Component } from 'react'
import TopNav from 'component/nav-top/index.jsx'
import SideNav from 'component/nav-side/index.jsx'
import './theme.css'

class Layout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="wrapper">
                <TopNav />
                <SideNav />
                {this.props.children}
            </div>
        )
    }
}

export default Layout