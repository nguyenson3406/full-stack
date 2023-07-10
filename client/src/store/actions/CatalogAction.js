export const CatalogData = (data) => {
    return {
        type: 'CATALOG_DATA',
        payload: data
    }
}

export const ClearCatalog = () => {
    return {
        type: 'CLEAR_CATALOG',
    }
}