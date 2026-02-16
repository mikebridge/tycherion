import React from "react";
import {MoviePreview} from "./moviePreview";
import {movieList} from "./filmData";
import { useNavigate } from "react-router-dom";
import {getSearchStateQS} from "./urlUtils";

interface ISuggestedResultProps {
    slug: string;
}

export const SuggestedResult = ({slug}: ISuggestedResultProps) => {
    let navigate = useNavigate();
    const handleClick = () => {
        const qs = getSearchStateQS(window.location.hash);
        const path = qs ? `/suggest?${qs}`: `/suggest`;
        navigate(path);
    }
    const movie = movieList.find(m => m.slug === slug);
    return (
        movie ?
            (<MoviePreview movie={movie} onReset={handleClick} />) :
            (<div>not found</div>)
    )
}
