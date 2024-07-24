import logo from './logo.svg';
/* import './App.css'; */
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';

import ProfileSetupStepper from './profile-management/profile-setup/ProfileSetupStepper';
import OrganizationProfileSetup from './profile-management/profile-setup/OrganizationProfileSetup';
import ProfileSettings from './profile-management/profile-settings/ProfileSettings';
import NavBar from './shared/navbar/NavBar';
import { CssBaseline } from '@mui/material';

function App() {
  const isSignin = true;
  return (
    <div className="App">
      <CssBaseline/>
      <NavBar></NavBar>
      {
        isSignin ? <SignIn></SignIn> : <SignUp></SignUp>
      }
      <ProfileSetupStepper/>
      <OrganizationProfileSetup></OrganizationProfileSetup>

      <ProfileSettings></ProfileSettings>
    </div>
  );
}

export default App;
