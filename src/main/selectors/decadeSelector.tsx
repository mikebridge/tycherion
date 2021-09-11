import React, {useState} from "react";
import "./selectors.css";

const getDecades = (): number[] => {
    const startDecade = 1910;
    const currentYear = new Date().getFullYear();
    const currentDecade = currentYear - (currentYear % 10);
    return Array.from({length: (currentDecade - startDecade) / 10 + 1}, (
        x, i) => startDecade + i * 10);
}

interface IDecadeMultiSelectorProps {
    label: string,
    selectedDecades: string[],
    onChange: (decades: string[]) => void
}

export const DecadeMultiSelector = ({label, selectedDecades, onChange}: IDecadeMultiSelectorProps) => {
    const [decades, setDecades] = useState<string[]>(selectedDecades);
    // const [isOpen, setIsOpen] = useState(selectedDecades.length > 0);
    //
    // const toggle = () => setIsOpen(!isOpen);

    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        const isChecked = (e.currentTarget as any).checked;
        if (isChecked) {
            const newDecades = [...decades, currentValue]
            setDecades(newDecades);
            onChange(newDecades);
        } else {
            const newDecades = decades.filter((decade) => currentValue !== decade);
            setDecades(newDecades);
            onChange(newDecades);
        }

    }
    return (
        <div className="selector">
            <div className="selector-label">{label}</div>
            {getDecades().map(decade => decade.toString()).map(decade =>
                <div key={decade} className="selector-item">
                    <label>
                        <input type="checkbox" name={decade} checked={decades.includes(decade)}
                               value={decade} onChange={onSelectionChanged}/>
                        {decade}s
                    </label>
                </div>
            )}
        </div>
    )
}