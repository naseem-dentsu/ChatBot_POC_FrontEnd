import { useEffect, useState } from 'react'
import './App.css'
import Heading from './component/heading.component.jsx';
import InputArea from './component/inputArea.component.jsx';
import SubHeading from './component/subHeading.component.jsx';
import ChatArea from './component/chatArea.component.jsx';
import LoadingArea from './component/loadingArea.component';

function App() {
  return (
    <>
      <div className='content'>
        <Heading />
        <ChatArea />
        <InputArea />
      </div>

    </>
  )
}

export default App
