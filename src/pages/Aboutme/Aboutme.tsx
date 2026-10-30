import { useEffect } from "react";
import { useLoading } from "../../contexts";
import BioSection from "./BioSection";
import ExperienceSection from "./ExperienceSection";
import StatusSection from "./StatusSection";
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
            <StatusSection/>
            {/* <TimelineSection/> */}
            <ScriptingSkillsSection/>
            <ExperienceSection/>
            <SoftSkillsSection/>
        </main>
    )
}