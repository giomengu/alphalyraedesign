import React , { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Stack from './Stack';
import config from '../assets/config'; // Import the config file
import ClientsComponent from './ClientsComponent';
import SignUp from './SignUpComponent';
import { AuthProvider,AuthContext } from './AuthProvider';
import Logout from './LogoutComponent';
import Login from './LoginComponent';
import PrivateRoute from './PrivateRouteComponent';
function PrivePage() {
    const { currentUser } = useContext(AuthContext);
  return (
    <Stack direction="v" style={{overflow:'auto',marginTop:'10px'}}>
        {currentUser ?? <ClientsComponent/>}
        {currentUser ?? 
        <div>
        <Login/>
        <SignUp/>
        </div>
        }
    </Stack>
    );
}

export default PrivePage;

// Repeat for Gallery.js and Contact.js with appropriate content changes
