
export const withQueryParams = (path: string, queryParams: Record<string, string>) => {
    const query = new URLSearchParams(queryParams);

    return `${path}?${query.toString()}`;
}
