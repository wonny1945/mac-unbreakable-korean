import { writable } from 'svelte/store';

export const countries = [
    {value: "us", label: "🇺🇸 United States"},
    {value: "kr", label: "🇰🇷 Korean(한국어)"},
    {value: "cn", label: "🇨🇳 Chinese(中文)"},
    {value: "jp", label: "🇯🇵 Japanese(日本語)"},
    {value: "th", label: "🇹🇭 Thailand(ไทย)"},
    {value: "ae", label: "🇦🇪 Arab Emirates(العربية)"}
];

export const selectedCountry = writable(countries[0]);
export const selectedLanguage = writable(countries[0])

export async function detectCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch country information');
        }
        const data = await response.json();
        const detectedCountry = countries.find(c => c.value === data.country_code.toLowerCase());
        if (detectedCountry) {
            selectedLanguage.set(detectedCountry);
            selectedCountry.set(detectedCountry)
        }
    } catch (err) {
        console.error('Error detecting country:', err);
    }
}