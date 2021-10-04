import { emptyEditor, appendContent } from '../editor';
import { setCurrentFileHandle } from './file-system-access';

function handleFile(event: Event) {
    emptyEditor();

    const input = <HTMLInputElement>event.target;
    if (!input) {
        return;
    }

    const files = input.files;
    if (!files || !files.length) {
        return;
    }

    // Force nullify the current file system access API handle. 
    // Since we just dropped a file, the previously opened file (if any) doesn't exist
    // anymore, so we shouldn't allow saving it back to disk .
    setCurrentFileHandle(null);

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = e => {
            let result = e.target?.result;
            if (!result) {
                return;
            }
            if (typeof result !== 'string') {
                const enc = new TextDecoder('utf-8');
                result = enc.decode(result);
            }
            appendContent(result);
        };

        reader.readAsText(file);
    }
}

const inputEl = document.querySelector('#input-file');
inputEl?.addEventListener('change', handleFile);
