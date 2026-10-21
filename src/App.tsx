import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { pages } from './pages/config';
import Footer from './components/Footer';
import Head from './components/Head';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { useLoading } from './contexts';

function App() {

  const location = useLocation();
  const {clearTasks} = useLoading(); 

  useEffect(() => {
    if (location) {
      let caption = getPageCaption(location.pathname) ?? "";
      document.title = `Aggelos Pipilikas | ${caption}`;
      clearTasks();
    }
  }, [location])

  const getPageCaption = (pathname : string) => {
    return pages.find(page => page.to == pathname)?.caption
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
