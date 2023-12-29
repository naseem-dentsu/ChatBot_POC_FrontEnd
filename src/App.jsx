import './App.css'
import Heading from './component/heading.component.jsx';
import InputArea from './component/inputArea.component.jsx';
import ChatArea from './component/chatArea.component.jsx';
// import SwitchMethod from './component/SwitchMethod';

function App() {
  return (
    <>
      <div className='content'>
        <Heading />
        <ChatArea />
        <InputArea />
        {/* <SwitchMethod /> */}
      </div>

    </>
  )
}

export default App
