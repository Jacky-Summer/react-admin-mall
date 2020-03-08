import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProdoctDetail from 'page/product/index/detail.jsx'
import ProductCategory from 'page/product/category/index.jsx'
import CategoryAdd from 'page/product/category/add.jsx'

const ProductRouter = () => {
    return (
        <Switch>
            <Route path='/product/index' component={ProductList}></Route>
            <Route path='/product/save/:id?' component={ProductSave}></Route>
            <Route path='/product/detail/:id' component={ProdoctDetail}></Route>
            <Route path='/product-category/index/:id?' component={ProductCategory}></Route>
            <Route path='/product-category/add' component={CategoryAdd}></Route>
            <Redirect exact from='/product' to='/product/index'/>
            <Redirect exact from="/product-category" to="/product-category/index"/>
        </Switch>
    )
}


export default ProductRouter