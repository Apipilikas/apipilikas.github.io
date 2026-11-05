import { useEffect } from "react";
import DownloadButton from "../../components/DownloadButton";
import Section from "../../components/Section";
import { useLoading, useTranslation } from "../../contexts";
import './ResumeStyles.scss';

const id = "resume-section";

export default function Resume() {

    const {setPageReady} = useLoading();
    const {language, getTranslation} = useTranslation();

    useEffect(() => {
        setPageReady();
    })

    return (
        <main>
            <Section id={id} caption={getTranslation("resumeSection")}>
                <div className="content">
                    <embed src={`resumes/Evangelos_Pipilikas_CV_${language.id}.pdf`}/>
                    <div className="button-area">
                        <DownloadButton link="resumes/Evangelos_Pipilikas_CV_en.pdf" caption={getTranslation("downloadEnglishButton")}/>
                        <DownloadButton link="resumes/Evangelos_Pipilikas_CV_gr.pdf" caption={getTranslation("downloadGreekButton")}/>
                    </div>
                </div>
            </Section>
        </main>
    )
}