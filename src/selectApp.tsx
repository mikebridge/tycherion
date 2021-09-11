//import React from 'react';

export const SelectApp = () => {
    // this is a temporary hack since Redirect doesn't seem to work with hash fragments.
    (window as any).location.assign("#/suggest");
    return null;
}
