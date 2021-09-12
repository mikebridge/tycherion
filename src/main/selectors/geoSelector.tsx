import React, {MouseEvent, useEffect, useState} from "react";
import "./selectors.css";

interface IGeoSelectorProps {
    selectedGeo: string,
    onChange: (geo: string) => void
}

const geoLookup = (abbrev: string) => {
    return abbrev==='CA' ? 'Canada' : 'United States'
}

const getGeoFromLocalStorage = (): string | null => localStorage.getItem('geo');

const setGeoToLocalStorage = (geo: string) => localStorage.setItem('geo', geo);

export const GeoSelector = ({onChange}: IGeoSelectorProps) => {
    const [geo, setGeo] = useState<string>(getGeoFromLocalStorage() || 'US');

    useEffect(() => {
        setGeoToLocalStorage(geo);
        onChange(geo);
    },[geo, onChange])

    const onSelectionChanged = (e: MouseEvent<HTMLElement>, geoValue: string) => {
        e.preventDefault();
        setGeo(geoValue);
    }
    return (
        <div className="selector">
            <div className="selector-button geoselector-button">I am in:
                <img className="geoselector-flag"
                     src={`${process.env.PUBLIC_URL}/${geo.toLowerCase()}.svg`} alt={geoLookup(geo)}
                     onClick={(e) => onSelectionChanged(e,geo === 'US' ? 'CA': 'US')}/>
            </div>

        </div>
    )
}
