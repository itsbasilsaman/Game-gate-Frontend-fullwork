import   { useState } from 'react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en'); // Default language is English

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };
  return (
    <li className="flex items-center">
      <label
        className={`relative   block h-[38px] w-[86px] rounded-full cursor-pointer ${
          language === 'ar' ? 'bg-gray-300' : 'bg-gray-300'
        }`}
        onClick={toggleLanguage}
      >
        <span
          className={`absolute  top-[3px]  flex h-[32px] w-[45px] items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out transform ${
            language === 'ar' ? 'translate-x-9' : 'translate-x-1'
          }`}
        >
          {language === 'en' ? (
            <span className="text-sm font-semibold text-gray-700">En</span>
          ) : (
            <span className="text-sm font-semibold text-gray-700">Ar</span>
          )}
        </span>
      </label>
      <span className="ml-4 text-sm font-medium text-gray-700">
        {language === 'en' ? 'English' : 'العربية'}
      </span>
    </li>
  );
};

export default LanguageSwitcher;
