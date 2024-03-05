
function SendMsg({ message }) {

    return (
        <div className='message-send'>
            <div className='message-text message-text-send'>
                {message}
            </div>
            <svg className="right-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M11.4253 0H2C0.89543 0 0 0.89543 0 2V9.76203C0 11.4523 1.96667 12.3804 3.27142 11.3059L12.6967 3.54386C14.1452 2.35103 13.3017 0 11.4253 0Z" />
            </svg>
        </div>
    )
}

export default SendMsg
