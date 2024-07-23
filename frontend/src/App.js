import logo from './logo.svg';
import './App.css';
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';

import ProfileSetupStepper from './profile-management/profile-setup/ProfileSetupStepper';
import OrganizationProfileSetup from './profile-management/profile-setup/OrganizationProfileSetup';

function App() {
  const isSignin = true;
  return (
    <div className="App">
      {
        isSignin ? <SignIn></SignIn> : <SignUp></SignUp>
      }
      <ProfileSetupStepper/>
      <OrganizationProfileSetup></OrganizationProfileSetup>
    </div>
  );
}

export default App;
