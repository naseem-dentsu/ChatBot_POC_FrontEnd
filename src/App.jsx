import './App.scss'
import Heading from './component/heading.component.jsx';
import InputArea from './component/inputArea.component.jsx';
import ChatArea from './component/chatArea.component.jsx';
import { useContext } from 'react';
import { MessageContext } from './context/message.context.jsx';
// import SwitchMethod from './component/SwitchMethod';

function App() {
  const { client } = useContext(MessageContext)
  return (
    <>
      <div className={`content ${client === "DISNEY" ? "disney-wrapper" : ""}`}>
        <Heading />
        <ChatArea />
        <InputArea />
        {/* <SwitchMethod /> */}
      </div >

    </>
  )
}

export default App
