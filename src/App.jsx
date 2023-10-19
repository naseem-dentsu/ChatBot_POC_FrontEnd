import { useEffect } from 'react'
import './App.css'
import Heading from './component/heading.component.jsx';
import InputArea from './component/inputArea.component.jsx';
import SubHeading from './component/subHeading.component.jsx';
import ChatArea from './component/chatArea.component.jsx';
import LoadingArea from './component/loadingArea.component';

function App() {
  useEffect(() => {
    console.log(import.meta.env)
  }, [])

  return (
    <>
      <div className='content'>
        <Heading />
        <SubHeading />
        <ChatArea />
        <InputArea />
        <LoadingArea />
      </div>

    </>
  )
}

export default App
