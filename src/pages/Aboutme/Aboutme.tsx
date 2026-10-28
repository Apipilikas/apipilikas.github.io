import { useEffect } from "react";
import { useLoading } from "../../contexts";
import BioSection from "./BioSection";
import ExperienceSection from "./ExperienceSection";
import InfoSection from "./InfoSection";
import ScriptingSkillsSection from "./ScriptingSkillsSection";
import SoftSkillsSection from "./SoftSkillsSection";
import TimelineSection from "./TimelineSection";

export default function Aboutme() {

    const {setPageReady} = useLoading();

    useEffect(() => {
        setPageReady();
    }, [])

    return (
        <main>
            <BioSection/>
            <InfoSection/>
            <TimelineSection/>
            <ScriptingSkillsSection/>
            <ExperienceSection/>
            <SoftSkillsSection/>
        </main>
    )
}