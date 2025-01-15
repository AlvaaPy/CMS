import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Impor UserProvider
import Login from './Pages/Login';
import LoginAdmin from './Pages/LoginAdmin';
import Regis from './Pages/Regis';
import Cms from './Pages/CMS/Cms';
import AdminCMS from './Pages/CMS/Admin/Redaksi';
import UserMarketingView from './Pages/CMS/CmsUser';
import Marketing from './Pages/CMS/Admin/Marketing';
import IT from './Pages/CMS/Admin/IT';
import HumanCapital from './Pages/CMS/Admin/HumanCapital';
import Product from './Pages/CMS/Admin/Product';
import Redaksi from './Pages/CMS/Admin/Redaksi';


function App() {
  return (
    <UserProvider> {/* Bungkus dengan UserProvider */}
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/LoginAdmin' exact element={<LoginAdmin />} />
          <Route path='/Registrasi' exact element={<Regis />} />
          <Route path='/CMS' exact element={<Cms />} />
          <Route path='/marketing' exact element={<Marketing />} />
          <Route path='/it' exact element={<IT />} />
          <Route path='/human-capital' exact element={<HumanCapital />} />
          <Route path='/product' exact element={<Product />} />
          <Route path='/redaksi' exact element={<Redaksi />} />
          <Route path='/Home' exact element={<UserMarketingView />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
