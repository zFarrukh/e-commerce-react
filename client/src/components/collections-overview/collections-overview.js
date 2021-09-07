import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';


import CollectionPreview from '../collection-preview/collection-preview';

import './collections-overview.style.scss'

function CollectionsOverview({ collections }) {
    return (
        <div className="collections-overview">
            {
            collections.map(({id, ...otherCollectionProps}) => {
                return <CollectionPreview key={id} {...otherCollectionProps} />
            }) 
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
})

export default connect(mapStateToProps)(CollectionsOverview)
