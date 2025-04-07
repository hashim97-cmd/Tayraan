'use client';
import { useEffect } from 'react';

// Initialize Google Translate
function TranslateInit() {
    if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
        return;
    }
    new google.translate.TranslateElement({
        pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
        includedLanguages: window.__GOOGLE_TRANSLATION_CONFIG__.languages.map(
            (lang) => lang.name
        ).join(','), // Include languages defined in config
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Optional: Adjust widget layout
    }, 'google_translate_element'); // 'google_translate_element' is the ID of the container element
}

// Component for loading the Google Translate script and setting up the language configuration
const GoogleTranslate = () => {
    useEffect(() => {
        // Define the translation configuration
        window.__GOOGLE_TRANSLATION_CONFIG__ = {
            languages: [
                { title: 'English', name: 'en' },
                { title: 'Deutsch', name: 'de' },
                { title: 'Español', name: 'es' },
                { title: 'Français', name: 'fr' },
                // Add more languages here as needed
            ],
            defaultLanguage: 'en', // Default language
        };

        // Load the Google Translate API script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=TranslateInit';
        script.async = true;
        script.onload = () => {
            // Once the script is loaded, initialize the translation widget
            TranslateInit();
        };
        document.head.appendChild(script);
    }, []);

    return (
        <div id="google_translate_element" className="notranslate"></div> // This is the container for the translation widget
    );
};

export default GoogleTranslate;
