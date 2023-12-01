import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { responseParser } from "../utility/utils";
export const MessageProvider = ({ children }) => {
    const [loading, setLoading] = useState({ isLoading: false, query: "" });
    const [error, setError] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [history, setHistory] = useState("");
    const [ansMessage, setAnsMessage] = useState("");
    const [chatThread, setChatThread] = useState([])
    const [apiEndpoint, setApiEndpoint] = useState("query/search");


    const { PROD, VITE_APP_API_BASE_DEV_URL, VITE_APP_API_BASE_PROD_URL } = import.meta.env;


    const fireQuery = (queryMessage) => {
        if (queryMessage) {
            const param = {
                "query": queryMessage,
                "history": history
            }

            axios.
                post(
                    (PROD ? VITE_APP_API_BASE_PROD_URL : VITE_APP_API_BASE_DEV_URL) + apiEndpoint,
                    param,
                    // { baseURL: import.meta.env.VITE_APP_BASE_URL }
                    { headers: { "content-type": "application/json" } }
                ).then((response) => {

                    const answer = typeof response.data == "string" ? response.data : response.data.text;

                    const his = history + "\nQ:" + queryMessage + "\nA:" + answer
                    const finalOutput = responseParser(answer);

                    setChatThread(prevThread => [...prevThread, { "Q": queryMessage, "A": finalOutput }])

                    setAnsMessage(finalOutput)

                    setHistory(his)

                }).catch((_error) => {
                    console.log(_error);
                    const answer = "Something went wrong. Please try again"
                    const his = history + `Human: ${queryMessage}\nAI: ${answer}`
                    let a = chatThread
                    a.push({ "Q": queryMessage, "A": answer })
                    setChatThread(a)
                    setAnsMessage(answer)
                    setHistory(his)
                    setError(true);
                })
        }
    };

    useEffect(() => {
        setLoading({ isLoading: false, query: "" })
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
        ansMessage,
        setAnsMessage,
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
