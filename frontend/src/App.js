import logo from './logo.svg';
import './App.css';
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';
import NewEventForm from './event-management/NewEventForm';
import ProfileSetupStepper from './profile-management/profile-setup/ProfileSetupStepper';
import OrganizationProfileSetup from './profile-management/profile-setup/OrganizationProfileSetup';
import ProfileSettings from './profile-management/profile-settings/ProfileSettings';
import NavBar from './shared/navbar/Navbar';
import { CssBaseline } from '@mui/material';
import ProfileSetupPage from './profile-management/profile-setup/ProfileSetupPage';
import { Route, Routes } from 'react-router-dom';
import GlobalLayout from './shared/layout/GlobalLayout';
import AuthRequired from './shared/components/AuthRequired';
import EventCard from './event-management/EventCard';
import Events from './event-management/Events';

import MapComponent from './lib/leaflet/MapComponent';

function App() {
  const isSignin = true;
  return (
    <div className="App">
      <CssBaseline/>
      
      {/* {
        isSignin ? <SignIn></SignIn> : <SignUp></SignUp>
      }
      <ProfileSetupStepper/>
      <OrganizationProfileSetup></OrganizationProfileSetup>

      <ProfileSettings></ProfileSettings>
      <ProfileSetupPage></ProfileSetupPage> */}



      <Routes>
        <Route path='/test' element={<Events></Events>} />
          <Route path='/signin' element={<SignIn></SignIn>}/>
          <Route path='/signup' element={<SignUp></SignUp>}/>
          
            <Route path='/setup' element={<GlobalLayout></GlobalLayout>}>
              <Route path='hiker-profile' element={<AuthRequired><ProfileSetupStepper/></AuthRequired>}></Route>
              <Route path='organization-profile' element={<AuthRequired><OrganizationProfileSetup/></AuthRequired>}></Route>        
            </Route>

            <Route path='/events'>
                <Route path='new' element={<AuthRequired><NewEventForm></NewEventForm></AuthRequired>}></Route>
            </Route>
          
        </Routes>


{/*   <MapComponent/>
 */}
    </div>
  );
}

export default App;
