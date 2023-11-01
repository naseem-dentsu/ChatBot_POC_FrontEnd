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
      Switch to : {apiEndpoint == "query/search" ? "query/document" : "query/search"}
    </button>
  )
}

export default SwitchMethod