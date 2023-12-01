
function GetMsg({ message }) {

    return (
        <div className='message-get'>
            <svg className="left-arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.57467 0H12C13.1046 0 14 0.89543 14 2V9.76203C14 11.4523 12.0333 12.3804 10.7286 11.3059L1.30326 3.54386C-0.145177 2.35103 0.698291 0 2.57467 0Z" fill="white" />
            </svg>

            <div className='message-text message-text-get' dangerouslySetInnerHTML={{
                __html: message
            }} />

        </div>

    )
}

export default GetMsg
