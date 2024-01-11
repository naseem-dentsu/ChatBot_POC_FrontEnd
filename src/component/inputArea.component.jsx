import "regenerator-runtime";
import { useContext, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MessageContext } from "../context/message.context";
import  "../assets/sent.svg";
import  "../assets/mic.svg";
import "../assets/voice-search.png";
const sentIcon = 'https://cdn.jsdelivr.net/gh/indranil-k/chatbot@master/assets/sent.svg';
const micIconClose = 'https://cdn.jsdelivr.net/gh/indranil-k/chatbot@master/assets/mic.svg';
const micIconOpen = 'https://cdn.jsdelivr.net/gh/indranil-k/chatbot@master/assets/voice-search.png';

function InputArea() {
  const { setInputDisabled, setLoading, fireQuery, loading } =
    useContext(MessageContext);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  onchange = async () => {
    const element = document.getElementById("chat-input");
    if (element.value.length !== 0) {
      setLoading({ isLoading: true, query: element.value });
      setInputDisabled(false);
      let query = element.value;
      element.value = "";
      await fireQuery(query);
    }
  };
  const onMicClick = () => {
    if (!browserSupportsSpeechRecognition) {
      return console.error("Browser doesn't support speech recognition.");
    }
    if (!isMicrophoneAvailable) {
      alert("Please Enable Microphone Permissions to use mic");
      return;
    }
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  useEffect(() => {
    if (listening) {
      const element = document.getElementById("chat-input");
      if (element) {
        element.value = transcript;
      }
    }
  }, [listening, transcript]);

  useEffect(() => {
    const element = document.getElementById("chat-input");
    if (element) {
      element.focus();
    }
  }, [loading]);
  return (
    <div className="input-component">
      <div className="input-component-inter">
        <input
          id="chat-input"
          className="input-text"
          type="text"
          placeholder="Write to Bot"
          onSubmit={onchange}
        />
        <div className="mic-icon-div">
          <img
            src={listening ? micIconOpen : micIconClose}
            className="mic-icon"
            alt="Mic logo"
            onClick={onMicClick}
          />
        </div>
      </div>
      <div className="sent-icon-div">
        <img
          src={sentIcon}
          className="sent-icon"
          alt="Sent logo"
          onClick={onchange}
        />
      </div>
    </div>
  );
}

export default InputArea;
