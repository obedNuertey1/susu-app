function getSearchQueryParams(queryString: string):any {
    // Parse the URL string
    const url = new URL(queryString);

    // Get the search parameters
    const params:any = new URLSearchParams(url.search);

    // Convert search parameters to JSON object
    const json:any = {};
    for (const [key, value] of params) {
        json[key] = value;
    }
    return json;
}

export default getSearchQueryParams;