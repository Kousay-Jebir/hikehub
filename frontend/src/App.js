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
import AuthProvider from './auth/context/AuthProvider';
import { NotificationProvider } from './shared/context/NotificationContext';
import UserProfile from './profile-management/profile/UserProfile';
import OrganizationProfile from './profile-management/profile/OrganizationProfile';
import { green,grey,brown } from '@mui/material/colors';
import EventReview from './review-management/EventReview';
function App() {
  const isSignin = true;
  const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
        light: green[300],
        dark: green[700],
        contrastText: '#fff',
      },
      secondary: {
        main: brown[500],
        light: brown[300],
        dark: brown[700],
        contrastText: '#fff',
      },
      background: {
        default: grey[100],
        paper: grey[50],
      },
      text: {
        primary: grey[900],
        secondary: grey[800],
      },
    },
  });
  return (
    <NotificationProvider>
      <AuthProvider>
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
                <Route path='/' element={<EventReview></EventReview>}/>
                <Route path='/signin' element={<SignIn></SignIn>}/>
                <Route path='/signup' element={<SignUp></SignUp>}/>
      
                  <Route element={<GlobalLayout></GlobalLayout>}>
                    <Route path='/setup' >
                      <Route path='hiker-profile' element={<AuthRequired><ProfileSetupStepper/></AuthRequired>}></Route>
                      <Route path='organization-profile' element={<AuthRequired><OrganizationProfileSetup/></AuthRequired>}></Route>
                    </Route>
                    <Route path='/hiker' >
                      <Route path='account' element={<AuthRequired><UserProfile></UserProfile></AuthRequired>}></Route>
                    </Route>
                    <Route path='/organizer'>
                      <Route path='account' element={<AuthRequired><OrganizationProfile></OrganizationProfile></AuthRequired>}></Route>
                    </Route>
                    <Route path='/events'>
                        <Route path='new' element={<AuthRequired><NewEventForm></NewEventForm></AuthRequired>}></Route>
                        <Route path='test' element={<AuthRequired><Events></Events></AuthRequired>} />
                    </Route>
                  </Route>
              </Routes>
      
      
          {/*   <MapComponent/>
           */}
          </div>
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
