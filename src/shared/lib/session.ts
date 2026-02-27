const SESSION_KEY = 'guest_session_id';

export const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};

export const removeSessionId = () => {
  localStorage.removeItem(SESSION_KEY);
};
