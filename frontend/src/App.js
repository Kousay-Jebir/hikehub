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
      <ProfileSetupPage></ProfileSetupPage>
    </div>
  );
}

export default App;
