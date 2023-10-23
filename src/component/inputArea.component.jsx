import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message.context'
import sentIcon from '../assets/sent.svg'
import micIcon from '../assets/mic.svg'

function InputArea() {
    const { setInputDisabled, setLoading, fireQuery, loading } = useContext(MessageContext)
    onchange = () => {
        const element = document.getElementById("chat-input")
        if (element.value.length !== 0) {
            setLoading({ isLoading: true, query: element.value })
            setInputDisabled(false)
            fireQuery(element.value)
            element.value = ""
        }

    }
    const onMicClick = () => {
        console.log("called")
    }
    useEffect(() => {
        const element = document.getElementById("chat-input")
        if (element) {
            element.focus();
        }
    },
        [loading])
    return (
        <div className='input-component'>
            <input id="chat-input" className='input-text' type='text' placeholder='Ask me something..' onSubmit={onchange} />
            <div className='mic-icon-div'>
                <img src={micIcon} className="mic-icon" alt="Mic logo" onClick={onMicClick} />
            </div>
            <div className='sent-icon-div'>
                <img src={sentIcon} className="sent-icon" alt="Sent logo" onClick={onchange} />
            </div>
        </div>
    )
}

export default InputArea
