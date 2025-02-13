import { useState } from 'react';
import './letter.css';
import Quiz from './Quiz';

const img = require('../assets/img-letter.png');

function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="letter">
      {!isOpen ? (
        <>
          <img className='letter-img' src={img} alt="" />
          <p>KNOCK KNOCK!</p>
          <p>Here is a letter for you!</p>
          <button onClick={() => setIsOpen(true)}>Click to open it</button>
        </>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default Letter;
