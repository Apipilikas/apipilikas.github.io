export interface NewsProps {
    title : string, 
    date : string,
    description : string,
}

export interface SkillProps {
    imagePath : string,
    caption : string
}

const skills : SkillProps[] = [
    {
        "imagePath" : "/images/java.png",
        "caption" : "Java"
    },
    {
        "imagePath" : "/images/js.png",
        "caption" : "Javascript"
    },
    {
        "imagePath" : "/images/html-5.png",
        "caption" : "Html-5"
    },
    {
        "imagePath" : "/images/css-3.png",
        "caption" : "CSS-3"
    },
    {
        "imagePath" : "/images/python.png",
        "caption" : "Python"
    },
    {
        "imagePath" : "/images/c-.png",
        "caption" : "C++"
    },
    {
        "imagePath" : "/images/postgre.png",
        "caption" : "Postgress"
    },
    {
        "imagePath" : "/images/c-sharp.png",
        "caption" : "C#"
    },
    {
        "imagePath" : "/images/vb.png",
        "caption" : "VB"
    }
]

export interface LiferoadProps {
    title : string,
    subtitle : string,
    description : string,
    timeline : LiferoadTimelineProps
}

export interface LiferoadTimelineProps {
    to : string,
    from : string
}

export {skills}