import { ReactNode } from 'react';
import Home from './Home'
import Aboutme from './Aboutme';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';

export interface PageRouteProps {
  to: string;
  id: string;
  captionKey: string;
  element: ReactNode;
}

export interface SocialNetworkProps {
  link: string;
  imageName: string;
  caption: string;
  name: string;
}

const socialNetworks : SocialNetworkProps[] = [
        {link : "https://github.com/Apipilikas", imageName : "github", caption : "Apipilikas", name: "GitHub"},
        {link : "https://www.facebook.com/aggelos.pipilikas/", imageName : "facebook", caption : "Aggelos Pipilikas", name: "Facebook"},
        {link : "https://www.linkedin.com/in/aggelos-pipilikas/", imageName : "linkedin", caption : "Aggelos Pipilikas", name: "LinkedIn"},
        {link : "mailto:apipilikas@gmail.com", imageName : "email", caption : "apipilikas@gmail.com", name: "Gmail"}
    ]

const pages : PageRouteProps[] = [
    {to: "/", id: "home", captionKey: "homePage", element: <Home/>},
    {to: "/aboutme", id: "aboutme", captionKey : "aboutmePage", element : <Aboutme/>},
    {to: "/projects", id:"projects", captionKey: "projectsPage", element: <Projects/>},
    {to: "/resume", id:"resume", captionKey: "resumePage", element: <Resume/>},
    {to: "/contact", id:"contact", captionKey: "contactPage", element: <Contact/>}
]

export {pages, socialNetworks}