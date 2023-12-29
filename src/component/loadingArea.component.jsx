import { useContext, useEffect } from 'react'
import { MessageContext } from '../context/message.context'
import SendMsg from './sendChat.component'
import { scrollToBottom } from '../utility/utils'
import GetMsg from './getChat.component'
function LoadingArea() {
    const { loading, streamMsg } = useContext(MessageContext);
    useEffect(() => {
        if (loading.isLoading || streamMsg) {
            scrollToBottom();
        }
    }, [loading.isLoading, streamMsg])

    return (
        <>
            {
                loading.isLoading && <>
                    <SendMsg message={loading.query} />
                    {
                        !streamMsg ? <div className='loading'>
                            <div className="brand-logo"></div>
                            <div className="typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div> :
                            <GetMsg message={streamMsg + " ..."} />}
                </>
            }
        </>
    )
}

export default LoadingArea
