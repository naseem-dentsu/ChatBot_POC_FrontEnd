import { useContext } from "react"
import { MessageContext } from "../context/message.context"

function Heading() {
    const { client } = useContext(MessageContext);
    const imgurl = client === "DISNEY" ? "https://cdn.registerdisney.go.com/v4/asset/bundler/DISNEY/v4/images/v1/disney-logo.svg" : "https://shiseido.ipscdn.net/sa1/on/demandware.static/-/Sites-shiseido_us-Library/default/dw0adc8875/sfsc/Shiseido.Logotype.Negative.2020.png"
    return (
        <div className="heading">
            <header>
                <img src={imgurl} />
                <h2 className='heading-text'>
                    Virtual Assistant
                </h2>
            </header>
        </div>


    )
}

export default Heading
