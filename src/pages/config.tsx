import { ReactNode } from 'react';
import Home from './Home'
import Aboutme from './Aboutme';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';
import { jsonProperty } from '../decorators';

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

export interface NewsProps {
    title: string, 
    date: string,
    description: string,
}

export interface SkillProps {
    imagePath: string;
    caption: string;
    level: number;
}

export interface LiferoadProps {
    title: string;
    subtitle: string;
    description: string;
    timeline: LiferoadTimelineProps;
}

export interface LiferoadTimelineProps {
    to : string;
    from : string;
}

export interface InfoLineProps {
    description: string;
    content: string;
}

export class GitHubProfileProps {
    @jsonProperty("login")
    username: string = "";

    name: string = "";
    
    @jsonProperty("avatar_url")
    avatarUrl: string = "";

    @jsonProperty("html_url")
    link: string = "";

    location: string = "";
    
    bio: string = "";
    
    @jsonProperty("public_repos")
    publicRepositoryNumber: number = 0;
    
    followers: number = 0;

    constructor() {}
}

export class GitHubProjectProps {
    @jsonProperty("name")
    title: string = "";

    @jsonProperty<string>("pushed_at", (v) => v.split("T")[0])
    updateDate: string = "";

    description: string = "";

    @jsonProperty("html_url")
    link: string = "";

    topics: string[] = [];

    @jsonProperty("languages_url")
    languageUrl: string = "";

    languages: string[] = [];

    @jsonProperty("stargazers_count")
    stars: number = 0;
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

const skills : SkillProps[] = [
    {
        "imagePath": "/images/java.png",
        "caption": "Java",
        "level": 4
    },
    {
        "imagePath": "/images/js.png",
        "caption": "Javascript",
        "level": 4
    },
    {
        "imagePath": "/images/html-5.png",
        "caption": "Html-5",
        "level": 5
    },
    {
        "imagePath": "/images/css-3.png",
        "caption": "CSS-3",
        "level": 4
    },
    {
        "imagePath": "/images/python.png",
        "caption": "Python",
        "level": 4
    },
    {
        "imagePath": "/images/c-.png",
        "caption": "C++",
        "level": 1
    },
    {
        "imagePath": "/images/postgre.png",
        "caption": "Postgress",
        "level": 3
    },
    {
        "imagePath": "/images/c-sharp.png",
        "caption": "C#",
        "level": 4
    },
    {
        "imagePath": "/images/vb.png",
        "caption": "VB",
        "level": 4
    }
]

const experiences: string[] = [
  "Github", "Kali Linux", "nmap", "Wireshark", "nodejs", "npm",
  "pgAdmin", "Database Design", "Android Studio", "Network protocols", 
  "DOT Net Framework", "Microsoft SQL Server" 
]

const projectsUrl = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";
const profileUrl = "https://api.github.com/users/Apipilikas";

export {pages, socialNetworks, skills, experiences, projectsUrl, profileUrl}