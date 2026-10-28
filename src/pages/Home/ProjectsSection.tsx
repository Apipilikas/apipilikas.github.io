import { useEffect, useState } from "react";
import SimpleButton from "../../components/SimpleButton";
import Section from "../../components/Section";
import deviceWidths from '../../index.module.scss'
import './ProjectsSectionStyles.scss'
import TextContainer from "../../components/TextContainer";
import { useLoading } from "../../contexts";
import useWindowSize from "../../hooks/useWindowSize";
import { useTranslation } from "../../contexts/TranslationProvider";

const url = "https://api.github.com/users/Apipilikas/repos?sort=pushed_at";
const id = "latest-projects-section"

export default function ProjectsSection() {

    const {getTranslation} = useTranslation();

    return (
        <Section id={id} caption={getTranslation("projectsSection")}>
            <SlideShow/>
        </Section>
    )
}

export interface ProjectProps {
    title : string,
    update_date: string,
    description : string,
    link : string
}

function SlideShow() {

    const {registerTask, deregisterTask, resolveTask} = useLoading();
    const {isTablet, isDesktop} = useWindowSize();

    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const slidesPerPage = isDesktop ? 4 : isTablet ? 2 : 1;

    useEffect(() => {
        registerEvents();

        fetchProjects();

        return () => deregisterEvents();
    },[])

    const registerEvents = () => {
        registerTask(id);
    }

    const deregisterEvents = () => {
        deregisterTask(id);
    }

    const fetchProjects = async() => {
        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        let init = {
            method: "GET",
            headers: myHeaders
        };

        try {
            const response = await fetch(url, init);
    
            if (response.ok) {
                const data = await response.json();
                setProjects(
                    data.map((item : any) => ({
                        "title": item.name,
                        "update_date": item.pushed_at.split("T")[0],
                        "description": item.description,
                        "link": item.html_url
                    }))
                );

                resolveTask(id);
            }
        }
        catch (e) {

        }
    }

    const renderedProjects = projects.slice(0, slidesPerPage).map(project => <ProjectContainer {...project}/>)

    return (
        <div id="latest-projects-slideshow" className="content">
            <div id="latest-projects-content">{renderedProjects}</div>
        </div>
    )
}

function ProjectContainer({title, update_date, description, link} : ProjectProps) {
    return (
        <article className="project">
            <TextContainer className="git-repo-date-info" applySecondaryColor>
                <h3>{title}</h3>
            </TextContainer>
            <TextContainer>
                <p>{update_date}</p>
            </TextContainer>
            <TextContainer>
                <p>{description}</p>
            </TextContainer>
            <div className="git-link">
                <SimpleButton caption="MORE" link={link}/>
                {/* <a className="button-link subject-link-more" href="{{link}}"><span></span>MORE</a> */}
            </div>
        </article>
    )
}