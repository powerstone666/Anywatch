import React, { createContext, useContext, useState, useEffect } from 'react';

const CastContext = createContext(null);

export function CastProvider({ children }) {
  const [castAvailable, setCastAvailable] = useState(false);
  const [castConnected, setCastConnected] = useState(false);
  const [castSession, setCastSession] = useState(null);

  useEffect(() => {
    // Initialize Cast API when available
    window['__onGCastApiAvailable'] = (isAvailable) => {
      if (isAvailable) {
        initializeCastApi();
      }
    };
  }, []);

  const initializeCastApi = () => {
    const cast = window.chrome?.cast;
    if (!cast) return;

    const context = cast.framework.CastContext.getInstance();
    
    // Set Cast options
    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    // Listen for session state changes
    context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      (event) => {
        switch (event.sessionState) {
          case cast.framework.SessionState.SESSION_STARTED:
          case cast.framework.SessionState.SESSION_RESUMED:
            setCastConnected(true);
            setCastSession(context.getCurrentSession());
            break;
          case cast.framework.SessionState.SESSION_ENDED:
            setCastConnected(false);
            setCastSession(null);
            break;
        }
      }
    );

    // Check if cast is available
    context.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      (event) => {
        setCastAvailable(event.castState !== cast.framework.CastState.NO_DEVICES_AVAILABLE);
      }
    );

    // Initialize cast button
    setCastAvailable(true);
  };

  const requestCastSession = () => {
    const cast = window.chrome?.cast;
    if (!cast) return;
    
    const context = cast.framework.CastContext.getInstance();
    context.requestSession();
  };

  const stopCasting = () => {
    if (castSession) {
      castSession.endSession(true);
    }
  };

  const loadMedia = (mediaUrl, metadata = {}) => {
    if (!castSession) return;

    const cast = window.chrome?.cast;
    if (!cast) return;

    const mediaInfo = new cast.framework.messages.MediaInfo(mediaUrl, 'video/mp4');
    mediaInfo.metadata = new cast.framework.messages.GenericMediaMetadata();
    mediaInfo.metadata.title = metadata.title || 'Video';
    mediaInfo.metadata.subtitle = metadata.subtitle || '';
    
    if (metadata.images && metadata.images.length > 0) {
      mediaInfo.metadata.images = metadata.images;
    }

    const request = new cast.framework.messages.LoadRequest(mediaInfo);
    castSession.loadMedia(request).then(
      () => console.log('Media loaded successfully'),
      (error) => console.error('Error loading media:', error)
    );
  };

  return (
    <CastContext.Provider
      value={{
        castAvailable,
        castConnected,
        requestCastSession,
        stopCasting,
        loadMedia,
      }}
    >
      {children}
    </CastContext.Provider>
  );
}

export function useCast() {
  const context = useContext(CastContext);
  if (!context) {
    throw new Error('useCast must be used within a CastProvider');
  }
  return context;
}
