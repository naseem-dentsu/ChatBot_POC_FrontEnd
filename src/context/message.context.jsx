import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const MessageProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(true);
    const [queryMessage, setQueryMessage] = useState("");
    const [history, setHistory] = useState("");
    const [ansMessage, setAnsMessage] = useState("");
    const [chatThread, setChatThread] = useState([])
    useEffect(() => {
        if (queryMessage) {
            const param = {
                "query": queryMessage,
                "history": history
            }
            axios.
                post(
                    import.meta.env.VITE_APP_BASE_URL + "query/search",
                    param,
                    // { baseURL: import.meta.env.VITE_APP_BASE_URL }
                    { headers: { "content-type": "application/json" } }
                ).then((response) => {
                    const answer = response.data.text
                    const his = history + "\nQ:" + queryMessage + "\nA:" + answer
                    let a = chatThread
                    a.push({ "Q": queryMessage, "A": answer })
                    setChatThread(a)
                    setAnsMessage(answer)
                    setHistory(his)
                    // eslint-disable-next-line no-unused-vars
                }).catch((_error) => { console.log(_error); setError(true); })
        }
    }, [chatThread, history, queryMessage])

    useEffect(() => {
        setLoading(false)
        setInputDisabled(true)
    }
        , [history])

    const value = {
        loading,
        setLoading,
        inputDisabled,
        setInputDisabled,
        queryMessage,
        setQueryMessage,
        history,
        setHistory,
        ansMessage,
        setAnsMessage,
        chatThread,
        setChatThread,
        error
    }
    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}
export const MessageContext = createContext({
    loading: false,
    setLoading: () => null,
    inputDisabled: true,
    setInputDisabled: () => null,
    queryMessage: "",
    setQueryMessage: () => null,
    history: "",
    setHistory: () => null,
    ansMessage: "",
    setAnsMessage: () => null,
    chatThread: [],
    setChatThread: () => null,
    error: false
})
