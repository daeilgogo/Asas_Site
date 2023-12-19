import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Protected from './Protected';
import { AuthContextProvider } from './AuthContext';
import Activity from './pages/Activity';
import Borrow from './pages/Borrow';
import Transaction from './pages/Transaction';
function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/Home' element={<Protected><Home/></Protected>}/>
         <Route path='/Activities' element={<Protected><Activity/></Protected>}/>
         <Route path='/Borrow' element={<Protected><Borrow/></Protected>}/>
         <Route path='/Transaction' element={<Protected><Transaction/></Protected>}/>
        
       </Routes>
    </BrowserRouter>
  </AuthContextProvider>
  );
}

export default App;
