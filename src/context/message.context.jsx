import { createContext, useEffect, useState } from "react";
// import axios from 'axios';
import { responseParser } from "../utility/utils";
export const MessageProvider = ({ children }) => {
    const [loading, setLoading] = useState({ isLoading: false, query: "" });
    const [error, setError] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [history, setHistory] = useState("");
    const [streamMsg, setStreamMsg] = useState("");
    const [chatThread, setChatThread] = useState([])
    const [apiEndpoint, setApiEndpoint] = useState("query/document");


    const { PROD, VITE_APP_API_BASE_DEV_URL, VITE_APP_API_BASE_PROD_URL } = import.meta.env;


    const fireQuery = async (queryMessage) => {
        if (queryMessage) {
            const param = {
                "query": queryMessage,
                "history": history
            }
            /* 
                Old code , since axios still (2023) doesnt support streaming data I will have to use the native fetch api
                axios.
                    post(
                        (PROD ? VITE_APP_API_BASE_PROD_URL : VITE_APP_API_BASE_DEV_URL) + apiEndpoint,
                        param,
                        // { baseURL: import.meta.env.VITE_APP_BASE_URL }
                        { headers: { "content-type": "application/json" }, responseType: "stream" }
                    ).then((response) => {
                        console.log(response);
                        const answer = typeof response.data == "string" ? response.data : response.data.text;
    
                        const his = history + "\nQ:" + queryMessage + "\nA:" + answer
                        const finalOutput = responseParser(answer);
    
                        setStreamMsg(finalOutput)
                        setChatThread(prevThread => [...prevThread, { "Q": queryMessage, "A": finalOutput }])
    
    
                        setHistory(his)
    
                    }).catch((_error) => {
                        console.log(_error);
                        const answer = "Something went wrong. Please try again"
                        const his = history + `Human: ${queryMessage}\nAI: ${answer}`
                        let a = chatThread
                        a.push({ "Q": queryMessage, "A": answer })
                        setChatThread(a)
                        setStreamMsg(answer)
                        setHistory(his)
                        setError(true);
                    })
            */
            try {
                const response = await fetch((PROD ? VITE_APP_API_BASE_PROD_URL : VITE_APP_API_BASE_DEV_URL) + apiEndpoint, {
                    // signal: AbortSignal.timeout(10000),
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(param),
                });
                if (!response.ok || !response.body) {
                    throw response.statusText;
                }

                // Here we start prepping for the streaming response
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                const loopRunner = true;
                var finalOutput = "";

                while (loopRunner) {
                    // Here we start reading the stream, until its done.
                    const { value, done } = await reader.read();
                    if (done) {
                        break;
                    }
                    const decodedChunk = decoder.decode(value, { stream: true });
                    finalOutput = responseParser(finalOutput + decodedChunk);
                    setStreamMsg(answer => responseParser(answer + decodedChunk)); // update state with new chunk
                }

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
        setApiEndpoint
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
    error: false
})
