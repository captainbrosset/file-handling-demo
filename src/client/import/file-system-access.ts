import { showUnsupportedMessage } from "../unsupported";
import { emptyEditor, appendContent } from '../editor';

const openButton = document.querySelector('#file-system-open');

// Stored here so we can reuse them in the export section.
let currentFileHandle: FileSystemFileHandle | null = null;

if (!('showOpenFilePicker' in window)) {
    const parent = openButton?.parentElement;
    openButton?.remove();
    showUnsupportedMessage(parent, 'The File System Access API is not supported');
} else {
    openButton?.addEventListener('click', async () => {
        [currentFileHandle] = await window.showOpenFilePicker({
            // Disallowing multiple files, since we want to be able to save back to
            // disk too, and we can only save back to one file.
            multiple: false
        });

        emptyEditor();

        const file = await currentFileHandle.getFile();
        const text = await file.text();

        appendContent(text);
    });
}

export function getCurrentFileHandle() {
    return currentFileHandle;
}

export function setCurrentFileHandle(handle: FileSystemFileHandle|null) {
    currentFileHandle = handle;
}
