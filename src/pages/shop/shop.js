import React from "react";
import { connect } from 'react-redux';
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { Route } from 'react-router-dom';
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectoinsStartAsync } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
    componentDidMount() {

        const { fetchCollectoinsStartAsync } = this.props;
        fetchCollectoinsStartAsync()
    }

    render() {
        const { match } = this.props

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
}

const mapDispatchToProps = (dispatch) => ({
    fetchCollectoinsStartAsync: () => dispatch(fetchCollectoinsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);