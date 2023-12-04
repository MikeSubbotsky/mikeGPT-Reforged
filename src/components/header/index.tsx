import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

export const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-300 p-4 flex justify-end items-center">
      <a href="https://www.linkedin.com/in/mike-subbotsky/" 
         className="mx-3 text-white hover:text-blue-500 transition-colors duration-300" 
         target="_blank" 
         rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href="https://github.com/MikeSubbotsky" 
         className="mx-3 text-white hover:text-gray-900 transition-colors duration-300" 
         target="_blank" 
         rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href="https://www.instagram.com/submix75/" 
         className="mx-3 text-white hover:text-pink-500 transition-colors duration-300" 
         target="_blank" 
         rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
};





