import React, {useState} from "react";
import "./selectors.css";

interface IGeoSelectorProps {
    selectedGeo: string,
    onChange: (geo: string) => void
}

const geoLookup = (abbrev: string) => {
    return abbrev==='CA' ? 'Canada' : 'United States'
}

export const GeoSelector = ({selectedGeo, onChange}: IGeoSelectorProps) => {
    const [geo, setGeo] = useState<string>(selectedGeo);

    const onSelectionChanged = (geoValue: string) => {
        setGeo(geoValue);
        onChange(geoValue);
    }
    return (
        <div className="selector">
            <div className="selector-label">I am in: {geoLookup(geo)}</div>

            <button type="button" value="US" className="country-button"
                    onClick={() => onSelectionChanged('US')}
            > <img style={{width:"50px"}} src={`${process.env.PUBLIC_URL}/us.svg`} alt="US" />
            </button>
            <button type="button" value="CA" className="country-button"
                    onClick={() => onSelectionChanged('CA')}
            ><img style={{width:"50px"}} src={`${process.env.PUBLIC_URL}/ca.svg`} alt="Canada" />
            </button>
        </div>
    )
}
