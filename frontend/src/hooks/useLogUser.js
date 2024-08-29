import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useLogUser = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [loggedInUser, setLoggedInUser] = useState([]);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setLoggedInUser(data);
        })
        .catch((error) => {
          console.error('Error fetching logged in user:', error);
        });
    }
  }, [email]);

  return [loggedInUser, setLoggedInUser];
};

export default useLogUser;
