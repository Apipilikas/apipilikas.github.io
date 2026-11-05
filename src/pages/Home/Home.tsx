import AboutmeSection from "./AboutmeSection";
import IntroductionSection from "./IntroductionSection";
import LiferoadSection from "./LiferoadSection";
import NewsSection from "./NewsSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";

export default function Home() {
    return (
        <main>
            <IntroductionSection/>
            <AboutmeSection/>
            <SkillsSection/>
            <LiferoadSection/>
            <ProjectsSection/>
            <NewsSection/>
        </main>
    )
}