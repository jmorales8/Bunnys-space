import React from 'react';

interface FloatingWordsProps {
  text: string;
}

export function FloatingWords({text}: FloatingWordsProps) {
  return (
    <div className="container">
      <h2 className="headline">
        {text.split('').map((char, index) => (
          <span
            className="char"
            key={index}
            style={{
              // staggered animation delay
              animationDelay: `${index * -0.5}s`,
              // alternate every other character
              animationName: index % 2 === 0 ? 'float' : 'float-alt'
            }}
          >
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
}
