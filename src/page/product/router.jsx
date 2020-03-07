import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProdoctDetail from 'page/product/index/detail.jsx'
import ProductCategory from 'page/product/category/index.jsx'

const ProductRouter = () => {
    return (
        <Switch>
            <Route path='/product/index' component={ProductList}></Route>
            <Route path='/product/save/:id?' component={ProductSave}></Route>
            <Route path='/product/detail/:id' component={ProdoctDetail}></Route>
            <Route path='/product-category' component={ProductCategory}></Route>
            <Redirect exact from='/product' to='/product/index'/>
        </Switch>
    )
}


export default ProductRouter