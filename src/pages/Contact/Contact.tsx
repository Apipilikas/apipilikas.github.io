import { useEffect } from "react";
import Section from "../../components/Section";
import { useLoading, useTranslation } from "../../contexts"
import { socialNetworks } from "../config";
import ContactContainer from "./ContactContainer";

export default function Contact() {

    const {getTranslation} = useTranslation();
    const {setPageReady} = useLoading();

    useEffect(() => {
        setPageReady();
    }, [])

    const renderedContacts = socialNetworks.filter(network => network.name != "GitHub").map(contact => <ContactContainer {...contact}/>)

    return (
        <main>
            <Section id="contact-me-section" caption={getTranslation("contactSection")}>
                {renderedContacts}
            </Section>
        </main>
    )
}