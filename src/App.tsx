import {useEffect, useState} from 'react'
import './App.css'
import {initCustomApp, InitData} from "just-a-test-of-custom-apps";

function App() {
    const [context, setContext] = useState<InitData['context']>();
    const [config, setConfig] = useState<InitData['config']>();

    useEffect(() => {
        const getData = async () => {
            const {config, context} = await initCustomApp();

            setContext(context);
            setConfig(config);
        }

        getData().catch(console.error);
    }, []);

    return (
        <>
            <div>
                <strong>Environment id: </strong>
                <span>{context?.environmentId}</span>
            </div>
            <div>
                <strong>User id: </strong>
                <span>{context?.userId}</span>
            </div>
            <div>
                <strong>User email: </strong>
                <span>{context?.userEmail}</span>
            </div>
            <div>
                <strong>User roles: </strong>
                {context?.userRoles.map(userRole => (
                    <div>
                        <strong>Id: </strong><span>{userRole.id}</span><br/>
                        <strong>Codename: </strong><span>{userRole.codename}</span>
                    </div>
                ))}
            </div>
            <br/>
            <strong>Config:</strong>
            <pre>
                <code>{JSON.stringify(config)}</code>
            </pre>
        </>
    )
}

export default App
