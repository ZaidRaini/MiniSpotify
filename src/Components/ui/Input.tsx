import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { InputProps } from '@/Constant/Interface';
import { useTexts } from '@/Constant/Texts';


interface box{
  className?: string,
  onChange?:(value: string) => void,
}


const InputBox = ({ className, onChange }:box) => {
  const texts = useTexts()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value); 
    }
  };


return (
  <div className={`flex items-center bg-[#FFFFFF14] p-2 rounded-lg ${className}`}>
    <input
      type="text"
      placeholder={texts.inputLabel}
      className="flex-grow bg-transparent border-none outline-none px-2 text-white md:text-lg text-sm"
      onChange={handleChange} 
    />
    <button
      
      className="text-gray-400 hover:text-[#FFFFFF]"
    >
      <FiSearch size={20} />
    </button>
  </div>
);
};

export default InputBox;
