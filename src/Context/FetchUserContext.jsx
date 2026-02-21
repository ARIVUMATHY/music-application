import React, { createContext, useContext, useEffect, useState } from 'react'; // Added useContext and useState
import { AuthUserContext } from './AuthContextApi';
import { onSnapshot, doc } from 'firebase/firestore'; // Added doc import
import { __DB } from '../backend/firebaseconfig'; // Ensure the correct path to your firebase config

// Create context for the backend user
export let BackendUserContext = createContext(null);

const FetchUserContext = ({ children }) => {
  const { authUser } = useContext(AuthUserContext); // Access authUser from AuthUserContext
  const { uid } = authUser || {}; // Handle cases where authUser might be null
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!uid) {
      return;
    }

    // onSnapshot() => event listener
    const user_data_reference = doc(__DB, "user_details", uid);
    const unsubscribe = onSnapshot(user_data_reference, (userinfo) => {
      console.log(userinfo.data()); // Log the user data
      setUserData(userinfo.data()); // Set the user data
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [uid]); // UID dependency: if uid changes, fetch the data again

  return (
    <BackendUserContext.Provider value={{ userData }}>
      {children}
    </BackendUserContext.Provider>
  );
};

export default FetchUserContext;