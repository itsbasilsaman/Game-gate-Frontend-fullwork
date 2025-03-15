import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import "tailwindcss/tailwind.css";

interface LanguageOption {
  value: string;
  label: string;
}

interface SelectedLanguage {
  language: LanguageOption;
 
}

const LanguageSection: React.FC = () => {
  const [languages, setLanguages] = useState<SelectedLanguage[]>([]);
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption | null>(null);
 
 

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: { languages?: Record<string, string> }[] = await response.json();

        const formattedLanguages: LanguageOption[] = data
          .flatMap((country) =>
            country.languages
              ? Object.entries(country.languages).map(([code, name]) => ({
                  value: code,
                  label: name,
                }))
              : []
          )
          .reduce<LanguageOption[]>((acc, lang) => {
            if (!acc.some((existing) => existing.value === lang.value)) {
              acc.push(lang);
            }
            return acc;
          }, []);

        setLanguageOptions(formattedLanguages);
      } catch (error) {
        console.error("Error fetching language options:", error);
      }
    };

    fetchLanguages();
  }, []);

  const handleAddLanguage = () => {
    if (selectedLanguage ) {
      setLanguages([...languages, { language: selectedLanguage }]);
      setSelectedLanguage(null);
   
      setIsAdding(false);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white   py-2   ">
      <h2 className="text-xl font-semibold primary-color mb-4" style={{fontFamily:"Unbounded"}}>Languages</h2>

      {/* List of Added Languages */}
      {languages.length === 0 && !isAdding && (
        <p className="text-gray-600 text-sm">No languages added yet. Click Add to add your languages.</p>
      )}

      <div className="space-y-4 ">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="flex justify-between items-center  bg-gray-100 border rounded-full py-2 px-3"
          >
            <div>
              <span className="block  primary-color">{lang.language.label}</span>
 
            </div>
            <button
              className="primary-color font-bold"
              onClick={() => handleRemoveLanguage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

 
      {!isAdding ? (
        <button
          className="mt-6 w-full primary-background text-white py-3 rounded-full     font-semibold"
          onClick={() => setIsAdding(true)}
        >
           Add Language
        </button>
      ) : (
        <div className= " w-full ">
          <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={(option: SingleValue<LanguageOption>) => setSelectedLanguage(option)}
            placeholder="Select language"
            isLoading={!languageOptions.length}
            className="mb-4  w-[320px] "
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#d1d5db", 
                borderRadius: '50px',
                padding:'5px 7px ',
                margin:'10px 0px'
              }),
            }}
          />
         
          <div className="flex gap-4">
            <button
              className="flex-1 primary-background text-white py-3 rounded-full "
              onClick={handleAddLanguage}
            >
              Save
            </button>
            <button
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSection;
