import { Helmet } from 'react-helmet';

export default function Head() {
    return (
        <Helmet>
            <link rel="icon" href="/images/ap_logo_2.png"/>
            <meta name="description" content="Aggelos Pipilikas' personal site"/>
            <meta name="keywords" content="Aggelos Pipilikas, Evaggelos Pipilikas, personal site"/>
            <meta name="author" content="Aggelos Pipilikas"/>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Helmet>
    )
}