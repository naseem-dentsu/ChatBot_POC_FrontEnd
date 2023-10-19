import { useContext } from 'react'
import loadingIcon from '../assets/loading.svg'
import { MessageContext } from '../context/message.context'
function LoadingArea() {
    const { loading } = useContext(MessageContext)
    return (
        <>
            {
                loading && <div className='loading'>
                    <img src={loadingIcon} className="logo loading-image" alt="Heading logo" />
                    <p className='loading-text'>Loading... </p>
                </div>
            }
        </>
    )
}

export default LoadingArea
