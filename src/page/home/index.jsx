import React, { Component } from 'react'
import PageTitle from 'component/page-title/index.jsx'

class Home extends Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-default">test</button>
                    </div>
                </div>

            </div>
        )
    }
}


export default Home