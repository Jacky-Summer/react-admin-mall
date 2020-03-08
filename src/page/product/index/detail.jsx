import React, { Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from 'page/product/index/category-selector.jsx'
import MUtil from 'util/mutil.js'
import Product from 'service/product-service.js'
import './save.scss'

const _util = new MUtil()
const _product = new Product()

class ProductSave extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 //商品状态1为在售
        }
    }

    componentDidMount() {
        this.loadProduct()
    }

    // 加载商品详情
    loadProduct() {
        if(this.state.id) {
            // 有id的时候，表示是编辑功能，需要表单回填
            _product.getProduct(this.state.id).then(res => {
                if(res.subImages) {
                    let subImages = res.subImages.split(',')
                    res.subImages = subImages.map(imgUri => {
                        return {
                            uri: imgUri,
                            url: res.imageHost + imgUri
                        }
                    })
                }
                res.defaultDetail = res.detail
                this.setState(res)
            }, errMsg => {
                _util.errorTips(errMsg)
            })
        }
        
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            readOnly
                            parentCategoryId={this.state.parentCategoryId}
                            categoryId={this.state.categoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {this.onCategoryChange(categoryId, parentCategoryId)}}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="价格" 
                                    name="price"
                                    readOnly
                                    value={this.state.price}
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                    placeholder="库存" 
                                    value={this.state.stock}
                                    name="stock"
                                    readOnly
                                    onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                        {
                            this.state.subImages && this.state.subImages.length ? this.state.subImages.map(
                                (image, index) => {
                                    return (
                                        <div className="img-con" key={index}>
                                            <img className="img" src={image.url} />
                                        </div>
                                    )
                                }
                            ) : <div>暂无图片</div>
                        }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave;