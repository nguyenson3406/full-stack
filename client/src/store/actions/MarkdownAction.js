export const MarkdownData = (data) => {
    return {
        type: 'MARKDOWN_DATA',
        payload: data
    }
}

export const ClearMarkdown = () => {
    return {
        type: 'CLEAR_MARKDOWN',
    }
}