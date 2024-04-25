import { useState, useEffect } from 'react';

export const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState<string | null>(null);

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  const isMobile = userAgent ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) : false;

  return { isMobile };
};