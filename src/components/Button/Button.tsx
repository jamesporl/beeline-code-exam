import { useState } from 'react';
import './Button.css';

type ButtonProps = {
  color: 'blue' | 'red';
  text: string;
  onClick: () => void;
}

const hoverColors = {
  red: '#cc0000',
  blue: '#0000cc',
}

function Button({ color, text, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      role="button"
      onClick={onClick}
      onMouseEnter={()=>{
        setIsHovered(true);
      }}
      onMouseLeave={()=>{
        setIsHovered(false);
      }}
      style={{ backgroundColor: isHovered ? hoverColors[color] : color }}
    >
      {text}
    </button>
  )
}

export default Button;
