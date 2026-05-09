import React, { useEffect, useRef } from 'react';

// Ad Script Injection Helper
const injectScript = (containerId: string, scriptContent: string) => {
  const container = document.getElementById(containerId);
  if (container && container.childNodes.length === 0) {
    const script = document.createElement('script');
    script.innerHTML = scriptContent;
    container.appendChild(script);
  }
};

export const NativeBanner: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = 'false';
    script.src = 'https://developdomicile.com/bc5972dfd55ab0a5e10b6ee43572241a/invoke.js';
    script.onerror = () => {};
    document.body.appendChild(script);
  }, []);

  return (
    <div className="ad-card" style={{ breakInside: 'avoid', marginBottom: '2rem' }}>
      <div id="container-bc5972dfd55ab0a5e10b6ee43572241a"></div>
    </div>
  );
};

export const Banner300x250: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : 'eca2cd8a7fd561c8d9ddc9b4e1302ac9',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/eca2cd8a7fd561c8d9ddc9b4e1302ac9/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} className="ad-center" style={{ margin: '2rem 0' }}></div>;
};

export const Banner728x90: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : 'c25ecd0c0fe9d93f6cf66f0016cbd198',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/c25ecd0c0fe9d93f6cf66f0016cbd198/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} className="ad-banner-top" style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}></div>;
};

export const Banner160x600: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : '419b347d315cd1215c1db06b7db000a5',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/419b347d315cd1215c1db06b7db000a5/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} className="ad-sidebar" style={{ position: 'fixed', right: '10px', top: '100px', zIndex: 50 }}></div>;
};

export const Banner320x50: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : 'f60abc3ad258484f0670ebbbace5b661',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/f60abc3ad258484f0670ebbbace5b661/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} className="ad-sticky-bottom" style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}></div>;
};

export const Banner468x60: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : 'd9b9196cf2814e58242076df2f21e5dc',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/d9b9196cf2814e58242076df2f21e5dc/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}></div>;
};

export const Banner160x300: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0) {
      const configScript = document.createElement('script');
      configScript.innerHTML = `
        atOptions = {
          'key' : '7f1e1c3d11870c7899ccce329cdd56e9',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      `;
      const invokeScript = document.createElement('script');
      invokeScript.src = 'https://developdomicile.com/7f1e1c3d11870c7899ccce329cdd56e9/invoke.js';
      invokeScript.onerror = () => {};
      ref.current.appendChild(configScript);
      ref.current.appendChild(invokeScript);
    }
  }, []);

  return <div ref={ref} style={{ margin: '1rem' }}></div>;
};

export const triggerPopunder = () => {
  if (!window.localStorage.getItem('popunder_triggered')) {
    const script = document.createElement('script');
    script.src = 'https://developdomicile.com/df/82/c8/df82c8c994f99d184cf5b5fe083c54df.js';
    document.head.appendChild(script);
    window.localStorage.setItem('popunder_triggered', 'true');
  }
};
