import { useContext, useEffect } from 'react'
import SendMsg from './sendChat.component'
import GetMsg from './getChat.component'
import LoadingArea from '../component/loadingArea.component';

import { MessageContext } from '../context/message.context'
import { scrollToBottom } from '../utility/utils';
function ChatArea() {
    const { chatThread, history } = useContext(MessageContext)


    useEffect(() => {
        scrollToBottom()
    }, [history]);

    return (
        <div className='chat-area no-scrollbar' id="top">
            <div className='dummy-message-div'>
                <div className='dummy-message-apla'>
                    <p className='dummy-message-apla-text'>
                        M
                    </p>
                </div>
                <div className="chat-content">
                    <p className='dummy-message'>
                        Hi! How can I help you?
                    </p>
                </div>
            </div>

            {chatThread.map((el, index) => {
                return (
                    <div key={index}>
                        <SendMsg message={el['Q']} />
                        {el['A'] &&
                            <GetMsg message={el['A']} />
                        }
                    </div>
                )
            })}
            <div id='bottom' >
                <LoadingArea />
            </div>
        </div>

    )
}

export default ChatArea
