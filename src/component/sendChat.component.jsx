import { useEffect, useState } from 'react'

function SendMsg({ message }) {

    return (
        <div className='message-send'>
            <div className='message-text message-text-send'>
                {message}
            </div>
        </div>
    )
}

export default SendMsg
