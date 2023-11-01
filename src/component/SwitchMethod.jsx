import { useContext } from 'react'
import { MessageContext } from '../context/message.context'

function SwitchMethod() {
  const { apiEndpoint, setApiEndpoint } = useContext(MessageContext)

  return (
    <button
      onClick={() => (
        setApiEndpoint(prevEndpoint => (
          prevEndpoint == "query/search" ? "query/document" : "query/search"
        )
        )
      )
      }>
      Switch to : {apiEndpoint == "query/search" ? "search using offline documents" : "search using real time methods"}
    </button>
  )
}

export default SwitchMethod