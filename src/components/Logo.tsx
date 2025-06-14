// src/components/Logo.tsx
import React from 'react';
import { useLocation } from 'react-router-dom'; // Keeping this, but it's not directly used for logo display

const Logo: React.FC = () => {
  const location = useLocation(); 
  
  return (
    // The logo container will use Tailwind flexbox classes to align its children (image and text).
    // flex: makes it a flex container.
    // items-center: vertically centers items.
    // gap-2: adds a 0.5rem gap between direct children.
    // padding and white-space classes applied for overall layout and preventing text wrap.
    <div className="flex items-center gap-2 p-4 whitespace-nowrap"> 
      {/* The image part of the logo.
          h-8: sets a fixed height of 2rem (32px).
          w-auto: allows the width to scale proportionally. */}
      <img src="/images/Bright Smile Logo.png" alt="BrightSmile Logo" className="h-8 w-auto" /> 
      {/* The text part of the logo.
          text-xl: sets font size to 1.25rem.
          font-bold: makes the text bold.
          text-blue-700: sets text color to a shade of blue (you can adjust this hex value). */}
      <h1 className="text-xl font-bold text-blue-700">BrightSmile</h1> 
    </div>
  );
};

export default Logo;
