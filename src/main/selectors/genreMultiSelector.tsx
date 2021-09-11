import React, {useState} from "react";
import {genreData} from "../filmData";

interface IGenreMultiSelectorProps {
    label: string,
    selectedGenres: string[],
    onChange: (genre: string[]) => void
}

export const GenreMultiSelector = ({label, selectedGenres, onChange}: IGenreMultiSelectorProps) => {
    const [genres, setGenres] = useState<string[]>(selectedGenres);
    // const [isOpen, setIsOpen] = useState(genres.length > 0);

    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        const isChecked = (e.currentTarget as any).checked;
        if (isChecked) {
            const newGenres = [...genres, currentValue]
            setGenres(newGenres);
            onChange(newGenres);
        } else {
            const newGenres = genres.filter((genre) => currentValue !== genre);
            setGenres(newGenres);
            onChange(newGenres);
        }
    }

    return (
        <div>
            {label}
            <div>
                {genreData.map(g =>
                    <div key={g.slug}>
                        <div>
                            <label>
                                {g.name}
                                <input type="checkbox" name={g.slug} checked={genres.includes(g.slug)}
                                       value={g.slug} onChange={onSelectionChanged}/>

                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}