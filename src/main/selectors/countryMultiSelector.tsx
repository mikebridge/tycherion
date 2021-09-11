import React, {useState} from "react";
import {summary} from "../filmData";


const getCountries = (): string[] => Object.keys(summary.countries)


interface ICountryMultiSelectorProps {
    label: string,
    selectedCountries: string[],
    onChange: (country: string[]) => void
}

export const CountryMultiSelector = ({label, selectedCountries, onChange}: ICountryMultiSelectorProps) => {
    const [countries, setCountries] = useState<string[]>(selectedCountries);
    // const [isOpen, setIsOpen] = useState(countries.length > 0);
    // const toggle = () => setIsOpen(!isOpen);

    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        const isChecked = (e.currentTarget as any).checked;
        if (isChecked) {
            const newCountries = [...countries, currentValue]
            setCountries(newCountries);
            onChange(newCountries);
        } else {
            const newCountries = countries.filter((countries) => currentValue !== countries);
            setCountries(newCountries);
            onChange(newCountries);
        }
    }
    const countryStrings = getCountries().map(country => country.toString());
    return (
        <div className="selector">
            <div className="selector-label">{label}</div>
            {countryStrings.map(country =>
                <div key={country} className="selector-item">
                    <label>
                        <input type="checkbox" name={`c_{country}`} checked={countries.includes(country)}
                               value={country} onChange={onSelectionChanged}/>
                        {country}
                    </label>
                </div>
            )}
        </div>
    )
}