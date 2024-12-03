import {useEffect, useState} from 'react'
import './App.css'
import {CustomAppContext, getCustomAppContext} from "just-a-test-of-custom-apps";

const App = () => {
    const [response, setResponse] = useState<CustomAppContext>();

    useEffect(() => {
        let ignore = false;
        const getData = async () => {
            const response = await getCustomAppContext();

            if (!ignore) {
                setResponse(response);
            }
        }

        getData().catch(console.error);

        return () => {
            ignore = true;
        }
    }, []);

    if (!response || response?.isError) {
        console.error({ errorCode: response?.code, description: response?.description});
        return <div>error</div>
    }

    console.log({ config: response.config, context: response.context });

    return (
        <>
            <div>
                <strong>Environment id: </strong>
                <span>{response.context.environmentId}</span>
            </div>
            <div>
                <strong>User id: </strong>
                <span>{response.context.userId}</span>
            </div>
            <div>
                <strong>User email: </strong>
                <span>{response.context.userEmail}</span>
            </div>
            <div>
                <strong>User roles: </strong>
                {response.context.userRoles.map(userRole => (
                    <div>
                        <strong>Id: </strong><span>{userRole.id}</span><br/>
                        <strong>Codename: </strong><span>{userRole.codename}</span>
                    </div>
                ))}
            </div>
            <br/>
            <strong>Config:</strong>
            <pre>
                <code>{JSON.stringify(response.config)}</code>
            </pre>
        </>
    )
};

export default App
