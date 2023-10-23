import { useContext } from 'react'
import { MessageContext } from '../context/message.context'
import SendMsg from './sendChat.component'
function LoadingArea() {
    const { loading } = useContext(MessageContext)
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
