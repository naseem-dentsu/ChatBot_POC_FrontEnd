import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message.context'
function InputArea() {
    const { setInputDisabled, setLoading, setQueryMessage, loading } = useContext(MessageContext)
    onchange = (e) => {
        e.preventDefault()
        setLoading(true)
        setInputDisabled(false)
        setQueryMessage(e.target.value)
        e.target.value = ""
    }
    useEffect(() => {
        const element = document.getElementById("chat-input")
        if (element) {
            element.focus();
        }
    },
        [loading])
    return (
        <>
            {!loading &&
                <div className='input-component'>
                    <input id="chat-input" className='input-text' type='text' placeholder='please write your query here' onSubmit={onchange} />
                </div>
            }
        </>
    )
}

export default InputArea
