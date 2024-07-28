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
import {ThemeProvider} from '@mui/material';
import MapComponent from './lib/leaflet/MapComponent';
import { createTheme } from '@mui/material/styles';
function App() {
  const isSignin = true;
  const theme = createTheme({
      palette: {
        primary: {
          main: '#2E8B57', // Forest Green
        },
        secondary: {
          main: '#8B4513', // Earth Brown
        },
        background: {
          default: '#F5F5DC', // Pale Beige
          paper: '#D3D3D3', // Light Grey
        },
        text: {
          primary: '#333333', // Charcoal Grey
          secondary: '#556B2F', // Dark Olive
        },
        action: {
          active: '#87CEEB', // Sky Blue
          hover: '#FF4500', // Sunset Orange
        },
        divider: '#A9A9A9', // Mountain Grey
      },
    });
  return (
    <ThemeProvider theme={theme}>
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
            <Route path='/signin' element={<SignIn></SignIn>}/>
            <Route path='/signup' element={<SignUp></SignUp>}/>
      
              <Route element={<GlobalLayout></GlobalLayout>}>
                <Route path='/setup' >
                  <Route path='hiker-profile' element={<AuthRequired><ProfileSetupStepper/></AuthRequired>}></Route>
                  <Route path='organization-profile' element={<AuthRequired><OrganizationProfileSetup/></AuthRequired>}></Route>
                </Route>
                <Route path='/events'>
                    <Route path='new' element={<AuthRequired><NewEventForm></NewEventForm></AuthRequired>}></Route>
                    <Route path='test' element={<Events></Events>} />
                </Route>
              </Route>
          </Routes>
      
      
      {/*   <MapComponent/>
       */}
      </div>
    </ThemeProvider>
  );
}

export default App;
