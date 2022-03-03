import { showUnsupportedMessage } from '../unsupported';
import { emptyEditor, appendContent } from '../editor';
import { get, set } from 'idb-keyval';

const openButton = document.querySelector('#file-system-open');
const reOpenButton = document.querySelector('#file-system-reopen');

// Stored here so we can reuse them in the export section.
let currentFileHandle: FileSystemFileHandle | null = null;

// Try to re-open the last saved file handle if any.
get('currentFileHandle').then(async (handle) => {
    if (handle) {
        currentFileHandle = handle;
    } else {
        reOpenButton?.setAttribute('disabled', 'true');
    }
});

if (!('showOpenFilePicker' in window)) {
    let parent = openButton?.parentElement;
    openButton?.remove();
    showUnsupportedMessage(parent, 'The File System Access API is not supported');

    parent = reOpenButton?.parentElement;
    reOpenButton?.remove();
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

        // Store the file handle in IndexedDB so we can re-open it later.
        await set('currentFileHandle', currentFileHandle);  
    });

    reOpenButton?.addEventListener('click', async () => {
        if (!currentFileHandle || !(await verifyPermission(currentFileHandle))) {
            return;
        }
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

async function verifyPermission(handle: FileSystemFileHandle) {
    // Check if we already have permission, if so, return true.
    if (await handle.queryPermission() === 'granted') {
      return true;
    }
  
    // Request permission to the file, if the user grants permission, return true.
    if (await handle.requestPermission() === 'granted') {
      return true;
    }
  
    // The user did not grant permission, return false.
    return false;
}
