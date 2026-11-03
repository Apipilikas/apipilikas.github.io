import { useEffect, useState } from "react"
import Section from "../../components/Section"
import TextButton from "../../components/TextButton"
import { useLoading } from "../../contexts"
import { ApiUtils } from "../../utils/apiUtils"
import { joinProps } from "../../utils/propUtils"
import { GitHubProfileProps, profileUrl } from "../config"
import './ProfileSectionStyles.scss'

const id = "profile-section"

export default function ProfileSection() {
    
    const {registerTask, deregisterTask, resolveTask} = useLoading();

    const [profile, setProfile] = useState<GitHubProfileProps>(new GitHubProfileProps());

    useEffect(() => {
        registerTask(id);

        fetchProfile();

        return () => deregisterTask(id);
    }, [])

    const fetchProfile = async () => {
        const data = await ApiUtils.makeGetRequest<GitHubProfileProps>(profileUrl);

        setProfile(data);

        resolveTask(id);
    }
    
    return (
        <Section id={id} caption="My GitHub Profile!">
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
                    <InfoContainer hintCaption={profile.followers?.toString()} caption=" followers" imgPath="images/followers.svg"/>
                    <InfoContainer hintCaption={profile.publicRepositoryNumber?.toString()} caption=" repositories" imgPath="images/repos.svg"/>
                    <InfoContainer caption="This is my GitHub account! Every project I have implemented is uploaded there!" className="hint-container"/>
                    <div className="button-area">
                        <TextButton caption="CHECK MY PROFILE" link={profile.link}/>
                        {/* <a  href={link} class="button-link"><span></span>CHECK MY PROFILE</a> */}
                    </div>
                </div>
            </div>
        </Section>
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
            <p>{hintCaption ? <span className="hint-caption">{hintCaption}</span> : null}{caption}</p>
        </div>
    )
}