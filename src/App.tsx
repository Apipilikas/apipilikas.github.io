import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { pages } from './pages/config';
import Footer from './components/Footer';
import Head from './components/Head';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { useLoading } from './contexts';
import { useTranslation } from './contexts/TranslationProvider';

function App() {

  const location = useLocation();
  const {getTranslation, isReady, language} = useTranslation();
  const {clearTasks} = useLoading(); 

  useEffect(() => {
    if (location) {
      console.log(language);
      document.title = `${getTranslation("fullName")} | ${getPageCaption(location.pathname)}`;
      clearTasks();
    }
  }, [location, isReady, language])

  const getPageCaption = (pathname : string) => {
    let caption = "";
    const captionKey = pages.find(page => page.to == pathname)?.captionKey;

    if (captionKey != null) {
      caption = getTranslation(captionKey);
    }

    return caption;
  }

  const renderedRoutes = pages.map(page => <Route path={page.to} element={page.element}/>)

  return (
  <>
      <Head/>
      <Header/>
      <Loader/>
      <Routes>
        {renderedRoutes}
      </Routes>
      <Footer/>
  </>
  );
}

export default App;
