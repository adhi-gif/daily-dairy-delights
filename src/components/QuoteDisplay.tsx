
import React, { useState, useEffect } from 'react';
import { dairyQuotes } from '@/utils/data';

export default function QuoteDisplay() {
  const [quote, setQuote] = useState('');
  
  // Get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * dairyQuotes.length);
    return dairyQuotes[randomIndex];
  };
  
  // Initialize with a random quote and change it every 10 seconds
  useEffect(() => {
    setQuote(getRandomQuote());
    
    const intervalId = setInterval(() => {
      setQuote(getRandomQuote());
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="bg-dairy-blue/40 p-6 rounded-lg text-center">
      <blockquote className="text-dairy-dark italic font-medium text-lg">
        "{quote}"
      </blockquote>
    </div>
  );
}
