if (typeof window !== 'undefined') {
  const { Buffer } = require('buffer');
  
  window.global = window.global ?? window;
  window.Buffer = window.Buffer ?? Buffer;
  window.process = window.process ?? { env: {} }; // Minimal process polyfill
}

export {};
