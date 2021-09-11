import React from "react";
import {MoviePreview} from "./moviePreview";
import {movieList} from "./filmData";
import { useHistory } from "react-router-dom";

interface ISuggestedResultProps {
    slug: string;
}

export const SuggestedResult = ({slug}: ISuggestedResultProps) => {
    let history = useHistory();
    const handleClick = () => {
        history.push("/suggest");
    }
    const movie = movieList.find(m => m.slug === slug);
    return (
        movie ?
            (<MoviePreview movie={movie} onReset={handleClick} />) :
            (<div>not found</div>)
    )
}