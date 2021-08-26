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

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

