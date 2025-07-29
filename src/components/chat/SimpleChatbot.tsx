import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const botReply = {
      type: 'bot',
      text: `Vous avez dit : "${input}". Je vais traiter votre demande.`
    };

    setMessages(prev => [...prev, userMessage, botReply]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-chatBox">
        {messages.map((msg, i) => (
          <div key={i} className={msg.type === 'user' ? 'chatbot-userMsg' : 'chatbot-botMsg'}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-inputRow">
        <input
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tapez un message..."
        />
        <button className="chatbot-button" onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

// Styles moved to external CSS file 'Chatbot.css'

export default Chatbot;

