import React, { Component } from 'react';
import { CKEditor } from 'ckeditor4-react';
import './MarkDown.scss'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';

class MarkDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.dataMarkdown
        };
        this.handleChange = this.handleChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.handleInstanceReady = this.handleInstanceReady.bind(this);
    }

    onEditorChange(evt) {
        let newData = evt.editor.getData()
        this.props.MarkdownData(newData)
        this.setState({
            data: newData
        });
    }

    handleChange(changeEvent) {
        this.setState({
            data: changeEvent.target.value
        });
    }

    handleInstanceReady({ editor }) {
        editor.setData(this.props.dataMarkdown);
    };

    render() {
        let { urlUpdate } = this.props
        return (
            <div className="MarkDown-container col-12">
                <CKEditor
                    data={this.state.data}
                    onInstanceReady={this.handleInstanceReady}
                    name="myeditor"
                    onChange={this.onEditorChange}
                    config={{
                        // toolbar: [
                        //     {
                        //         name: 'clipboard',
                        //         items: ['Undo', 'Redo']
                        //     },
                        //     {
                        //         name: 'styles',
                        //         items: ['Format', 'Font', 'FontSize']
                        //     },
                        //     {
                        //         name: 'colors',
                        //         items: ['TextColor', 'BGColor']
                        //     },
                        //     {
                        //         name: 'align',
                        //         items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                        //     },
                        //     '/',
                        //     {
                        //         name: 'basicstyles',
                        //         items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting']
                        //     },
                        //     {
                        //         name: 'links',
                        //         items: ['Link', 'Unlink']
                        //     },
                        //     {
                        //         name: 'paragraph',
                        //         items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
                        //     },
                        //     {
                        //         name: 'insert',
                        //         items: ['Image', 'Embed', 'Table']
                        //     },
                        //     {
                        //         name: 'tools',
                        //         items: ['Maximize']
                        //     },
                        //     {
                        //         name: 'editing',
                        //         items: ['Scayt', 'Source']
                        //     }
                        // ],

                        extraAllowedContent: 'h3{clear};h2{line-height};h2 h3{margin-left,margin-top}',

                        extraPlugins: 'embed,autoembed,format,font,colorbutton,justify,uploadimage',
                        uploadUrl: urlUpdate,

                        embed_provider: '//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',

                        // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
                        // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
                        filebrowserUploadUrl: urlUpdate,
                        // filebrowserImageUploadUrl: '/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
                        removeDialogTabs: 'image:advanced;link:advanced',
                        removeButtons: 'PasteFromWord'
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataMarkdown: state.markdown.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        MarkdownData: (data) => dispatch(actions.MarkdownData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkDown)