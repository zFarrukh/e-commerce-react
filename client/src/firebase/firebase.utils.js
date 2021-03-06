import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAMdzC9Rgw1fu7JVcw35bRWA73RQ8apcPc",
    authDomain: "crwn-e-com-db.firebaseapp.com",
    projectId: "crwn-e-com-db",
    storageBucket: "crwn-e-com-db.appspot.com",
    messagingSenderId: "390369627644",
    appId: "1:390369627644:web:ad0cce25e1e09d44d57679",
    measurementId: "G-5P5J0HKVKH"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) {
      return
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(err) {
        console.log("err creating user", err.message);
      }
    }

    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();

  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    return transformedCollection.reduce((acc, curr) => {
      acc[curr.title.toLowerCase()] = curr;
      return acc;
    }, {})
  }
  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;

