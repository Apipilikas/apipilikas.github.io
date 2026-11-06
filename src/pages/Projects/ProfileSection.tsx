import { useEffect, useState } from "react"
import AnimatedText from "../../components/AnimatedText"
import LoadingContainer from "../../components/LoadingContainer"
import Section from "../../components/Section"
import TextButton from "../../components/TextButton"
import { useLoading, useTranslation } from "../../contexts"
import { ApiUtils } from "../../utils/apiUtils"
import { joinProps } from "../../utils/propUtils"
import { GitHubProfileProps, profileUrl } from "../config"
import './ProfileSectionStyles.scss'

const id = "profile-section"

export default function ProfileSection() {
    
    const {getTranslation} = useTranslation();
    const {registerTask, deregisterTask, resolveTask, failTask, observeTask} = useLoading();

    const [profile, setProfile] = useState<GitHubProfileProps>(new GitHubProfileProps());

    const task = observeTask(id);

    useEffect(() => {
        registerTask(id);

        fetchProfile();

        return () => deregisterTask(id);
    }, [])

    const fetchProfile = async () => {
        try {
            const data = await ApiUtils.makeGetRequest<GitHubProfileProps>(profileUrl, GitHubProfileProps);
    
            setProfile(data);
    
            resolveTask(id);
        }
        catch (e) {
            if (e instanceof Error) {
                failTask(id, e.message);
            }
        }
    }
    
    return (
        <LoadingContainer status={task?.status} error={task?.error}>
            <Section id={id} caption={getTranslation("profileSection")}>
                <div className="content box-shadow">
                    <div className="username-container purple-theme">
                        <img src={profile.avatarUrl} className="box-shadow"/>
                        <div className="side-logo">
                            <h2>{profile.username}</h2>
                            <h3>{profile.name}</h3>
                        </div>
                    </div>
                    <div className="info-container">
                        <InfoContainer caption={profile.bio} imgPath="images/bio.svg"/>
                        <InfoContainer caption={profile.location} imgPath="images/location.svg"/>
                        <InfoContainer hintCaption={profile.followers?.toString()} caption={` ${getTranslation("infoFollowers")}`} imgPath="images/followers.svg"/>
                        <InfoContainer hintCaption={profile.publicRepositoryNumber?.toString()} caption={` ${getTranslation("infoRepositories")}`} imgPath="images/repos.svg"/>
                        <InfoContainer caption={getTranslation("infoHelp")} className="hint-container"/>
                        <div className="button-area">
                            <TextButton caption={getTranslation("profileButton")} link={profile.link}/>
                            {/* <a  href={link} class="button-link"><span></span>CHECK MY PROFILE</a> */}
                        </div>
                    </div>
                </div>
            </Section>
        </LoadingContainer>
    )
}

interface InfoContainerProps {
    caption: string;
    className?: string;
    hintCaption?: string;
    imgPath?: string;
}

function InfoContainer({caption, className, hintCaption, imgPath}: InfoContainerProps) {
    return (
        <div className={joinProps("info", className, "purple-theme", "box-shadow", "hover")}>
            {imgPath ? <img src={imgPath}/> : null}
            <p>{hintCaption ? <AnimatedText className="hint-caption" caption={hintCaption}/> : null}<AnimatedText caption={caption}/></p>
        </div>
    )
}