import logo from './logo.svg';
import './App.css';
import SignIn from './auth/components/SignIn';
import SignUp from './auth/components/SignUp';

function App() {
  const isSignin = false;
  return (
    <div className="App">
      {
        isSignin ? <SignIn></SignIn> : <SignUp></SignUp>
      }
    </div>
  );
}

export default App;
