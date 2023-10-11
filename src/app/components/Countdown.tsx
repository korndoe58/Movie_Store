'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface CountdownPopupProps {
  onClose: () => void;
}

const CountdownPopup: React.FC<CountdownPopupProps> = ({ onClose }) => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="   w-max    ">
      <div className="popup-inner">
        
        <div className=' bg-white/50 p-6 rounded-xl flex flex-col gap-4 justify-center items-center '>
          <div className='self-end'><button className='text-right ' onClick={onClose}>X</button></div>
          <h2 >Pay by QR </h2>
          <Image src={'/qr.png'} alt='qr' width={100} height={100}/>
          <p>Transfer your money within {timeRemaining} seconds.</p>
        </div>
        
      </div>
    </div>
  );
};

export default CountdownPopup;
