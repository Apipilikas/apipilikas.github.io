import { useEffect, useState } from "react";
import TextButton from "../../components/TextButton";
import Section from "../../components/Section";
import deviceWidths from '../../index.module.scss'
import './ProjectsSectionStyles.scss'
import TextContainer from "../../components/TextContainer";
import { useLoading } from "../../contexts";
import { useWindowSize } from "../../hooks";
import { useTranslation } from "../../contexts";
import { ApiUtils } from "../../utils/apiUtils";
import { GitHubProjectProps, projectsUrl } from "../config";

const id = "latest-projects-section";

export default function ProjectsSection() {

    const {getTranslation} = useTranslation();

    return (
        <Section id={id} caption={getTranslation("projectsSection")}>
            <SlideShow/>
        </Section>
    )
}

function SlideShow() {

    const {registerTask, deregisterTask, resolveTask} = useLoading();
    const {isTablet, isDesktop} = useWindowSize();

    const [projects, setProjects] = useState<GitHubProjectProps[]>([]);
    const slidesPerPage = isDesktop ? 4 : isTablet ? 2 : 1;

    useEffect(() => {
        registerTask(id);

        fetchProjects();

        return () => deregisterTask(id);
    },[])

    const fetchProjects = async() => {

        try {    
            const data = await ApiUtils.makeGetRequest<GitHubProjectProps[]>(projectsUrl, GitHubProjectProps);

            setProjects(data);

            resolveTask(id);
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

function ProjectContainer({title, updateDate, description, link} : GitHubProjectProps) {
    return (
        <article className="project">
            <TextContainer className="git-repo-date-info" applySecondaryColor>
                <h3>{title}</h3>
            </TextContainer>
            <TextContainer>
                <p>{updateDate}</p>
            </TextContainer>
            <TextContainer>
                <p>{description}</p>
            </TextContainer>
            <div className="git-link">
                <TextButton caption="MORE" link={link}/>
                {/* <a className="button-link subject-link-more" href="{{link}}"><span></span>MORE</a> */}
            </div>
        </article>
    )
}