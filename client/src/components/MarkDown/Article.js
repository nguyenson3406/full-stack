import React from 'react';
import { CKEditor } from 'ckeditor4-react';

const getArticle = id => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`<p>Here is my article with id ${id}...</p>`);
        }, 5000);
    });
};

const Article = ({ id }) => {
    const handleInstanceReady = ({ editor }) => {
        // Will be triggered only once, when editor is ready for interaction.
        getArticle(id).then(article => {
            editor.setData(article);
        });
    };

    return (
        <CKEditor
            initData="Hello from CKEditor 4!"
            onInstanceReady={handleInstanceReady}
        />
    );
}

export default Article;