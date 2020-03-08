import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mutil.js'
import Product from 'service/product-service.js'
import TableList from 'util/table-list/index.jsx'

const _product = new Product()
const _util = new MUtil()

class CategoryAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parentId: 0,
            categoryList: [],
            categoryName: ''
        }
    }

    componentDidMount() {
        this.loadCategoryList()
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.id
        if(oldPath !== newPath) {
            this.setState({
                parentId: newId
            }, () => {
                this.loadCategoryList()
            })   
        }
    }

    loadCategoryList() {
        _product.getCategoryList(this.state.parentId).then(res => {
            this.setState({
                categoryList: res
            })
            console.log(res)
        }, errMsg => {
            this.setState({
                categoryList : []
            });
            _util.errorTips(errMsg)
        })
    }

    onValueChange(e) {
        let value = e.target.value,
            name = e.target.name
        this.setState({
            [name]: value
        })
    }

    onSubmit() {
        let categoryName = this.state.categoryName.trim()
        _product.saveCategory({
            categoryName: categoryName,
            parentId: this.state.parentId
        }).then(res => {
            _util.successTips(res)
            this.props.history.push('/product-category')
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId" 
                                        className="form-control"
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" 
                                        placeholder="请输入品类名称"
                                        name="categoryName"
                                        value={this.state.name}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" 
                                        onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;