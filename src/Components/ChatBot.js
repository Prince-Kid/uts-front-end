import React, { useEffect } from 'react';

const VoiceflowChatWidget = ( ) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '667d389695d66da905e86ce4' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default VoiceflowChatWidget;
