import './App.scss'
import Heading from './component/heading.component.jsx';
import InputArea from './component/inputArea.component.jsx';
import ChatArea from './component/chatArea.component.jsx';
import { useContext } from 'react';
import { MessageContext } from './context/message.context.jsx';
// import SwitchMethod from './component/SwitchMethod';

function App() {
  const { client, setClient } = useContext(MessageContext)
  return (
    <>
      {
        client ? <>
          <div className={`content ${client === "DISNEY" ? "disney-wrapper" : ""}`}>
            <Heading />
            <ChatArea />
            <InputArea />
            {/* <SwitchMethod /> */}
          </div >
        </> : <>
          <section className='choose-client-wrapper'>
            <span className='head'>
              Choose Your Client!
            </span>
            <div className='shiseido' onClick={() => setClient("SHISEIDO")}>
              <img src={"https://shiseido.ipscdn.net/sa1/on/demandware.static/-/Sites-shiseido_us-Library/default/dw0adc8875/sfsc/Shiseido.Logotype.Negative.2020.png"} />
            </div>
            <div className='disney' onClick={() => setClient("DISNEY")}>
              <img src={"https://cdn.registerdisney.go.com/v4/asset/bundler/DISNEY/v4/images/v1/disney-logo.svg"} />
            </div>
          </section>
        </>
      }

    </>
  )
}

export default App
