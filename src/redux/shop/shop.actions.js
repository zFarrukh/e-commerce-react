import ShopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectoinsStart = () =>( {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectoinsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = err => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: err
})

export const fetchCollectoinsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collectoins');
        dispatch(fetchCollectoinsStart());

        collectionRef.get().then(async snapshot => {
          const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
          dispatch(fetchCollectoinsSuccess(collectionsMap));

        }).catch(err => dispatch(fetchCollectionsFailure(err.message)))
    }
}