import { createContext, useEffect, useState } from "react";
// import axios from 'axios';
import { responseParser } from "../utility/utils";
export const MessageProvider = ({ children }) => {
    const { PROD,
        VITE_APP_API_BASE_DEV_URL,
        VITE_APP_API_BASE_DEV_DISNEY_URL,
        VITE_APP_API_BASE_PROD_URL,
        VITE_APP_API_BASE_PROD_DISNEY_URL,
    } = import.meta.env;


    const [loading, setLoading] = useState({ isLoading: false, query: "" });
    const [error, setError] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [history, setHistory] = useState("");
    const [streamMsg, setStreamMsg] = useState("");
    const [chatThread, setChatThread] = useState([])
    const [apiEndpoint, setApiEndpoint] = useState("query/document");
    const [client, setClient] = useState();
    const [baseUrl, setBaseUrl] = useState("");
    const [domain, setDomain] = useState("https://www.shiseido.com");

    const fireQuery = async (queryMessage) => {
        if (queryMessage) {
            const param = {
                "query": queryMessage,
                "history": history
            }

            try {
                // const response = await fetch(baseUrl + apiEndpoint, {
                //     // signal: AbortSignal.timeout(10000),
                //     method: "POST",
                //     headers: {
                //         "content-type": "application/json"
                //     },
                //     body: JSON.stringify(param),
                // });
                // if (!response.ok || !response.body) {
                //     throw response.statusText;
                // }

                // // Here we start prepping for the streaming response
                // const reader = response.body.getReader();
                // const decoder = new TextDecoder();
                // const loopRunner = true;
                // var finalOutput = "";

                // while (loopRunner) {
                //     // Here we start reading the stream, until its done.
                //     const { value, done } = await reader.read();
                //     if (done) {
                //         break;
                //     }
                //     const decodedChunk = decoder.decode(value, { stream: true });
                //     finalOutput = responseParser(finalOutput + decodedChunk, domain);
                //     setStreamMsg(answer => responseParser(answer + decodedChunk, domain)); // update state with new chunk
                // }
var decodedChunk = `I can recommend two lip products from Shiseido based on the context provided. 

1. **Shimmer GelGloss, 02 Toki Nude**
    - Price: Â£28.00 for 9ml
    - Description: This Shiseido Shimmer GelGloss offers a glossy, high impact, weightless color. It wraps the lips in lustrous, lasting color and shine without feeling dry or sticky. You can purchase it [here](https://www.shiseido.co.uk/gb/en/shiseido-shimmer-gelgloss-730852164048.html).
    - Image: ![Shimmer GelGloss](https://www.shiseido.co.uk/fstrz/r/s/www.shiseido.co.uk/dw/image/v2/BCMQ_PRD/on/demandware.static/-/Sites-itemmaster_shiseido_emea/default/dw9e075ce1/images/products/64048/64048_01.jpg?sw=305&sh=305&sm=fit&frz-v=749)

2. **ModernMatte Powder Lipstick, 508 SEMI NUDE**
    - Price: Â£30.00 for 4g
    - Description: The Shiseido ModernMatte Powder Lipstick in the shade 508 Semi Nude offers a modern matte finish in a beautiful semi-nude shade. It is a high-quality product for lipstick lovers. Unfortunately, it is currently out of stock. You can find more information [here](https://www.shiseido.co.uk/gb/en/shiseido-modernmatte-powder-lipstick-729238147867.html).
    - Image: ![ModernMatte Powder Lipstick]([https://www.shiseido.co.uk/fstrz/r/s/www.shiseido.co.uk/dw/image/v2/BCMQ_PRD/on/demandware.static/-/Sites-itemmaster_shiseido_emea/default/dw9e075ce1/images/products/64048/64048_01.jpg?sw=305&sh=305&sm=fit&frz-v=749,https://www.shiseido.co.uk/fstrz/r/s/www.shiseido.co.uk/dw/image/v2/BCMQ_PRD/on/demandware.static/-/Sites-itemmaster_shiseido_emea/default/dwf8a7f4f8/images/pdp-images/Ultimune%203.0/Power_Infusing_Concentrate_3-0_50ml_768614172840_1500px.jpg?sw=1000&sh=1000&sm=fit&frz-v=760,https://www.shiseido.co.uk/dw/image/v2/BCMQ_PRD/on/demandware.static/-/Sites-itemmaster_shiseido_emea/en_GB/dw24b6eaf0/images/pdp-images/10217282301SHI_ULTIMUNE/10217282301SHI_REFILL_UK.jpg?sw=1000&sh=1000&sm=fit])

These are the two lip products available from Shiseido. Let me know if you need further assistance.`
                var finalOutput = responseParser(finalOutput + decodedChunk, domain);
                setStreamMsg(answer => responseParser(answer + decodedChunk, domain));

                setChatThread(prevThread => [...prevThread, { "Q": queryMessage, "A": finalOutput }])
                const his = history + "\nQ:" + queryMessage + "\nA:" + finalOutput
                setHistory(his)
            }
            catch (error) {
                console.log(error);
                const answer = "Something went wrong. Please try again"
                const his = history + `Human: ${queryMessage}\nAI: ${answer}`
                let a = chatThread
                a.push({ "Q": queryMessage, "A": answer })
                setChatThread(a)
                setStreamMsg(answer)
                setHistory(his)
                setError(true);
            }

        }
    };

    useEffect(() => {
        setLoading({ isLoading: false, query: "" })
        setStreamMsg("");
        setInputDisabled(true)
    }, [history])

    useEffect(() => {
        if (!client) return;
        let url;
        if (PROD) {
            if (client === "DISNEY") {
                url = VITE_APP_API_BASE_PROD_DISNEY_URL
            }
            else {
                url = VITE_APP_API_BASE_PROD_URL
            }
        }
        else {
            if (client === "DISNEY") {
                url = VITE_APP_API_BASE_DEV_DISNEY_URL
            }
            else {
                url = VITE_APP_API_BASE_DEV_URL
            }
        }
        setBaseUrl(url)
        setDomain(client === "DISNEY" ? "https://www.disneystore.co.uk" : "https://www.shiseido.com")
    }, [PROD, VITE_APP_API_BASE_DEV_DISNEY_URL, VITE_APP_API_BASE_DEV_URL, VITE_APP_API_BASE_PROD_DISNEY_URL, VITE_APP_API_BASE_PROD_URL, client])

    const value = {
        loading,
        setLoading,
        inputDisabled,
        setInputDisabled,
        fireQuery,
        history,
        setHistory,
        streamMsg,
        setStreamMsg,
        chatThread,
        setChatThread,
        error,
        apiEndpoint,
        setApiEndpoint,
        client,
        setClient
    }
    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}
export const MessageContext = createContext({
    loading: false,
    setLoading: () => null,
    inputDisabled: true,
    setInputDisabled: () => null,
    queryMessage: "",
    fireQuery: () => null,
    history: "",
    setHistory: () => null,
    ansMessage: "",
    setAnsMessage: () => null,
    chatThread: [],
    setChatThread: () => null,
    error: false,
    client: "",
    setClient: () => { },
})
