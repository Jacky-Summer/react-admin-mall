import React, { Component } from 'react';
import './category-selector.scss'
import Product from 'service/product-service.js'
import MUtil from 'util/mutil.js'

const _product = new Product()
const _util = new MUtil()

class CategorySelector extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }

    componentDidMount() {
        this.loadFirstCategory()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        // 数据没有发生变化的时候，直接不做处理
        if(!categoryIdChange && !parentCategoryIdChange) {
            return 
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        }else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                this.loadSecondCategory()
            })
        }    
    }

    // 选择一级品类
    onFirstCategoryChange(e) {
        if(this.props.readOnly) {
            return;
        }
        this.setState({
            firstCategoryId: e.target.value,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    // 选择二级品类
    onSecondCategoryChange(e) {
        if(this.props.readOnly) {
            return;
        }
        this.setState({
            secondCategoryId: e.target.value
        }, () => {
            this.onPropsCategoryChange()
        })
    }
    // 加载一级分类
    loadFirstCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }
    // 加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }

    onPropsCategoryChange() {
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function'
        // 如果有二级品类
        if(this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }

    render() {
        return (
            <div className="col-md-10">
                <select 
                    className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                {
                    this.state.firstCategoryList.map((category, index) => {
                        return <option value={category.id} key={index}>{category.name}</option>
                    })
                }
                </select>
                <select 
                    className="form-control cate-select"
                    value={this.state.secondCategoryId}
                    onChange={(e) => this.onSecondCategoryChange(e)}
                >
                    <option value="">请选择二级分类</option>
                {
                    this.state.secondCategoryList.map((category, index) => {
                        return <option value={category.id} key={index}>{category.name}</option>
                    })
                }
                </select>
            </div>
        );
    }
}

export default CategorySelector;