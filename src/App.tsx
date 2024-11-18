import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AppRoutes from './Routes';
import i18n from '../src/Lib/i18n';


const App: React.FC = () =>{
  const [openDark, setOpenDark] = useState(false);
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setOpenDark(savedDarkMode);
    document.getElementById('root')?.classList.toggle('dark', savedDarkMode);
  }, []);

  useEffect(() => {
    const currentLanguage = localStorage.getItem('lang') || 'ENG';
    i18n.changeLanguage(currentLanguage);
  }, []);

  return (
    <div className="">
      <AppRoutes />
      <ToastContainer/>
    </div>
  );
};

export default App;
