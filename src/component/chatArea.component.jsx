import { useContext, useEffect, useRef } from 'react'
import SendMsg from './sendChat.component'
import GetMsg from './getChat.component'
import { MessageContext } from '../context/message.context'
function ChatArea() {
    const { chatThread, history } = useContext(MessageContext)
    const scrollToBottom = () => {
        var secondContent = document.getElementById(
            "bottom",
        );
        var leftSection = document.getElementById("top");
        if (leftSection) {
            leftSection.scrollTop = secondContent.offsetTop;
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [history]);

    return (
        <div className='chat-area no-scrollbar' id="top">
            {chatThread.map((el, index) => {
                return (
                    <div key={index}>
                        <SendMsg message={el['Q']} />
                        <GetMsg message={el['A']} />
                    </div>
                )
            })}
            <div id='bottom' />
        </div>

    )
}

export default ChatArea
