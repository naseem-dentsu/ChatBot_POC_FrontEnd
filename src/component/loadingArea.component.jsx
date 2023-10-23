import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message.context'
import SendMsg from './sendChat.component'
import { scrollToBottom } from '../utility/utils'
function LoadingArea() {
    const { loading } = useContext(MessageContext)
    useEffect(() => {
        if (loading.isLoading) {
            scrollToBottom();
        }
    }, [loading.isLoading])
    return (
        <>
            {
                loading.isLoading && <>
                    <SendMsg message={loading.query} />
                    <div className='loading'>
                        <div className="typing">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default LoadingArea
