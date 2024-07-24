import logo from './logo.svg';
/* import './App.css'; */
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';

import ProfileSetupStepper from './profile-management/profile-setup/ProfileSetupStepper';
import OrganizationProfileSetup from './profile-management/profile-setup/OrganizationProfileSetup';
import ProfileSettings from './profile-management/profile-settings/ProfileSettings';
import NavBar from './shared/navbar/Navbar';
import { CssBaseline } from '@mui/material';
import ProfileSetupPage from './profile-management/profile-setup/ProfileSetupPage';
import { Route, Routes } from 'react-router-dom';
import GlobalLayout from './shared/layout/GlobalLayout';
import AuthRequired from './shared/components/AuthRequired';


function App() {
  const isSignin = true;
  return (
    <div className="App">
      <CssBaseline/>
      {/* 
      {
        isSignin ? <SignIn></SignIn> : <SignUp></SignUp>
      }
      <ProfileSetupStepper/>
      <OrganizationProfileSetup></OrganizationProfileSetup>

      <ProfileSettings></ProfileSettings> */}
      {/* <ProfileSetupPage></ProfileSetupPage> */}
      <Routes>
          <Route path='/signin' element={<SignIn></SignIn>}/>
          <Route path='/signup' element={<SignUp></SignUp>}/>
          
            <Route path='/setup' element={<GlobalLayout></GlobalLayout>}>
                   
                      
                        <Route path='/setup/hiker-profile' element={<AuthRequired><ProfileSetupStepper/></AuthRequired>}></Route>
                      
                      <Route path='/setup/organization-profile' element={<OrganizationProfileSetup/>}></Route>
                    
            </Route>
          
        </Routes>
    </div>
  );
}

export default App;
