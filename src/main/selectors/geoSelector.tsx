import React, {useState} from "react";

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
        <>
            <div>I am in: {geoLookup(geo)}</div>
            <button type="button" value="US"
                    className="dropdown-item"
                    onClick={() => onSelectionChanged('US')}
            >United States
            </button>
            <button type="button" value="CA"
                    className="dropdown-item"
                    onClick={() => onSelectionChanged('CA')}
            >Canada
            </button>


        </>
    )
}
