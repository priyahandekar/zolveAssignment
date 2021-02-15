import React, { useState } from 'react';
import './App.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { useLocation } from "react-router-dom";

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


// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

// function GetQueryParams() {
//         let query = useQuery();
//         let queryParams = query.get("q");
//         console.log('q', queryParams);
//     }


// function QueryParamsDemo() {

// }

// class InputField extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             inputText: '',
//             copied: false,
//         }
//     }

//     handleInputChange = (event) => {
//         setText(event.target.value);
//     }

//     copyText = () => {
//         setCopyBool(true)
//     }

//     useQuery = () => {
//         return new URLSearchParams(useLocation().search);
//     }

//     getQueryParams = () => {
//         let query = useQuery();
//         let queryParams = query.get("q");
//         console.log('q', queryParams);
//     }

//     render() {
//         const { inputText, copied } = this.state;
//         console.log('window', window.location);
//         return (
//             <div>
//                 <input type='text' value={inputText} name='inputText'
//                     onChange={this.handleInputChange} />

//                 <CopyToClipboard text={inputText}
//                     onCopy={this.copyText}>
//                     <button>Copy to clipboard</button>
//                 </CopyToClipboard>

//                 <button onClick={this.getQueryParams}>Copy from URL</button>

//                 {copied ? <span style={{ color: 'blue' }}>Copied.</span> : null}
//             </div>
//         );
//     }
// }
// export default InputField;