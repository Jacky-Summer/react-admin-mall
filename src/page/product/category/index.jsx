import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mutil.js'
import Product from 'service/product-service.js'
import TableList from 'util/table-list/index.jsx'

const _product = new Product()
const _util = new MUtil()

class ProductCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }

    componentDidMount() {
        this.loadCategoryList()
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.id
            console.log('--------------', newId)
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList()
            })   
        }
    }

    loadCategoryList() {
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            })
            console.log(res)
        }, errMsg => {
            this.setState({
                list : []
            });
            _util.errorTips(errMsg)
        })
    }

    onUpdateName(id, categoryName) {

        let productName = window.prompt('输入你要修改的名称', categoryName)
        if(productName) {
            let category = {
                categoryId: id,
                categoryName: productName
            }
            _product.updateCategoryName(category).then(res => {
                this.loadCategoryList()
            }, errMsg => {
                _util.errorTips(errMsg)
            })
        }
     
    }

    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{new Date(category.createTime).toLocaleString()}</td>
                    <td>
                        <a 
                            className="opear"
                            onClick={(e)=> this.onUpdateName(category.id, category.name)}
                        >修改名称</a> 
                        {category.parentId === 0 ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link> : null}
                    </td>
                </tr>
            )
        })

        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <TableList tableHeads={['Id','品类名称','创建时间','操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default ProductCategory;