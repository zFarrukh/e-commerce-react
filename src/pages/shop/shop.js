import React, { useEffect } from "react";
import { connect } from 'react-redux';
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { Route } from 'react-router-dom';
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectoinsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ match, fetchCollectoinsStart }) => {
    useEffect(() => {
        fetchCollectoinsStart()
    },[fetchCollectoinsStart]);


    return (
        <div className="shop-page">
            <Route 
            exact 
            path={`${match.path}`} 
            component={CollectionsOverviewContainer}
            />
            <Route 
            path={`${match.path}/:collectionId`} 
            component={CollectionPageContainer}
                />
        </div>
    ) 
    }


const mapDispatchToProps = (dispatch) => ({
    fetchCollectoinsStart: () => dispatch(fetchCollectoinsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);