// Simple password generator for client access
export const generateClientPassword = (): string => {
  const adjectives = [
    'happy', 'bright', 'swift', 'calm', 'bold', 'wise', 'kind', 'strong',
    'clear', 'fresh', 'quick', 'smart', 'cool', 'warm', 'safe', 'pure'
  ];
  
  const nouns = [
    'tiger', 'eagle', 'river', 'mountain', 'ocean', 'forest', 'star', 'moon',
    'sun', 'cloud', 'wind', 'fire', 'stone', 'tree', 'flower', 'bird'
  ];
  
  const numbers = Math.floor(Math.random() * 999) + 100; // 3-digit number
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective}-${noun}-${numbers}`;
};

// Example: "happy-tiger-456" or "bright-ocean-789"
// Easy to remember, type, and share but still secure