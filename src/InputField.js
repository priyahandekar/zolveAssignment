import React, { useState } from 'react';
import './App.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function InputField() {
    const [inputText, setText] = useState('');
    const [copied, setCopyBool] = useState(false);
    const handleInputChange = (event) => {
        setText(event.target.value);
    }

    const copyText = () => {
        setCopyBool(true)
    }

    const getQueryParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('q');
        console.log('query param is', myParam);
        setText(myParam);
    }

    console.log('Hi');
    return (
        <div className="input-fields">
            <input className="text-input" type='text' value={inputText} name='inputText'
                onChange={handleInputChange} />

            <CopyToClipboard text={inputText}
                onCopy={copyText}>
                <button className="copy-button">Copy to clipboard</button>
            </CopyToClipboard>

            <button onClick={getQueryParams}>Copy from URL</button>

            {copied ? <span style={{ color: 'blue' }}>Copied.</span> : null}

        </div>
    );
}
