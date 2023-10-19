import headingIcon from '../assets/heading-icon.svg'
function Heading() {

    return (
        <div className='heading'>
            <p className='heading-text'>
                Beauty Genie
            </p>
            <img src={headingIcon} className="logo" alt="Heading logo" />
        </div>


    )
}

export default Heading
