import { useSpring, animated } from "@react-spring/web";
import { ReactNode, useEffect, useRef, useState } from "react";
import Section from "../../components/Section";
import TextButton from "../../components/TextButton";
import { useLoading } from "../../contexts";
import { ApiUtils } from "../../utils/apiUtils";
import { joinProps } from "../../utils/propUtils";
import { GitHubProfileProps, GitHubProjectProps, projectsUrl } from "../config";
import './ProjectsSectionStyles.scss';

const id = "projects-section";

export default function ProjectsSection() {

    const {registerTask, deregisterTask, resolveTask} = useLoading();

    const [projects, setProjects] = useState<GitHubProjectProps[]>([]);
    
    const renderedProjects = projects?.map((project, key) => <Project key={key} {...project}/>)

    useEffect(() => {
        registerTask(id);

        fetchProjects();

        return () => deregisterTask(id);
    }, [])

    const fetchProjects = async () => {
        try {
            let data = await ApiUtils.makeGetRequest<GitHubProjectProps[]>(projectsUrl, GitHubProjectProps);
            
            for (let item of data) {
                const languages = await ApiUtils.makeGetRequest<any>(item.languageUrl); 
                item.languages = Object.keys(languages);
            }

            setProjects(data);

            resolveTask(id);
        }
        catch (e) {

        }
    }

    return (
        <Section id={id} caption="Projects">
            {renderedProjects}
        </Section>
    )
}

function Project({title, updateDate, description, link, topics, languages, stars}: GitHubProjectProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    const renderedTopics = topics.map(topic => <span>{topic}</span>);
    const renderedLanguages = languages.map(language => <span>{language}</span>);

    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (divRef.current) {
            setContentHeight(divRef.current.scrollHeight);
        }
        setIsOpen(value => !value);
    };

    const contentStyles = useSpring({
        height: isOpen ? contentHeight : 0,
        opacity: isOpen ? 1 : 0,
        config: { tension: 250, friction: 25 }
    });

    return (
        <div className="detailed-project">
            <div className="summary" onClick={handleClick}>
                <div className="title-container">
                    <img src="images/git.svg"/>
                    <h2>{title}</h2>
                </div>
                <div className="stars-container">
                    <span className="stars">{stars}</span>
                </div>
            </div>
            <animated.div ref={divRef} className="content" style={contentStyles}>
                <div className="top-container">
                    <div className="last-modified-container project-container">
                        <h3>Last modified</h3>
                        <div className="content">
                            <span>{updateDate}</span>
                        </div>
                    </div>
                    {topics.length != 0 ?
                        <ProjectContainer className="topics-container" caption="Topics">
                            {renderedTopics}
                        </ProjectContainer>
                        : null
                    }
                    <ProjectContainer className="development-languages-container" caption="Development languages">
                        {renderedLanguages}
                    </ProjectContainer>
                </div>
                <div className="description-container">
                    <h3>Description</h3>
                    <p>{description}</p>
                </div>
                <div className="button-area">
                    <TextButton className="github-button" caption="CHECK ON GITHUB" link={link}/>
                </div>
            </animated.div>
        </div>
    )
}

interface ProjectContainerProps {
    className: string;
    caption: string;
    children: ReactNode;
}

function ProjectContainer({className, caption, children}: ProjectContainerProps) {
    return (
        <div className={joinProps("project-container", className)}>
            <h3>{caption}</h3>
            <div className="content">
                {children}
            </div>
        </div>
    )
}