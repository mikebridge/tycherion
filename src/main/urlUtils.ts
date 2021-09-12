
export const getQsFromHash = (hash: string) => hash.indexOf('?') >= 0 ? hash.substr(hash.indexOf('?')) : '';

export const getPathFromHash = (hash: string) =>
    hash.indexOf('?') >= 0 ? hash.substr(1, hash.indexOf('?') - 1) : hash.substr(1);

export const setQueryParamInHash= (hash: string, key: string, values: string[]) => {
    const path = getPathFromHash(hash);
    const qs = getQsFromHash(hash);
    const query = new URLSearchParams(qs);
    query.delete(key);
    values.forEach((value) => {
        query.append(key, value);
    });
    const qsStr = query.toString();
    return qsStr ? `${path}?${qsStr}` : path;
}

export const getQueryParamFromHash = (hash: string, key: string): string[] => {
    const qs = getQsFromHash(hash);
    const query = new URLSearchParams(qs);
    return query.getAll(key);
}

export const getSearchStateQS = (hash: string): string => new URLSearchParams(getQsFromHash(hash)).toString();
