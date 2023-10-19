import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message.context'
function InputArea() {
    const { setInputDisabled, setLoading, fireQuery, loading } = useContext(MessageContext);

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setInputDisabled(false)
        fireQuery(e.target.value)
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
                    <input id="chat-input" className='input-text' type='text' placeholder='please write your query here' onSubmit={handleSubmit} />
                </div>
            }
        </>
    )
}

export default InputArea
