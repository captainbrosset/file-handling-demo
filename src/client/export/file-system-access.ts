import { showUnsupportedMessage } from '../unsupported';
import { getCurrentFileHandle, setCurrentFileHandle } from '../import/file-system-access';
import { getText } from '../editor';

const saveButton = document.querySelector('#file-system-save');
const saveAsButton = document.querySelector('#file-system-save-as');

// Toggle the 'save' button state depending on whether there is a file handle ready.
// We can only save back to the file we opened, if one was actually opened with the
// file system access API.
setInterval(() => {
    if (getCurrentFileHandle()) {
        saveButton?.removeAttribute('disabled');
    } else {
        saveButton?.setAttribute('disabled', 'true');
    }
}, 500);

async function writeFileBackToDisk(fileHandle: FileSystemFileHandle, text: string) {
    const writable = await fileHandle.createWritable();
    await writable.write(text);
    await writable.close();
}

if (!('showSaveFilePicker' in window)) {
    const parent = saveButton?.parentElement;
    saveButton?.remove();
    saveAsButton?.remove();
    showUnsupportedMessage(parent, 'The File System Access API is not supported');
} else {
    saveButton?.addEventListener('click', async () => {
        const currentFileHandle = getCurrentFileHandle();
        if (!currentFileHandle) {
            console.error('Please open a file using the File System Access API first');
            return;
        }

        await writeFileBackToDisk(currentFileHandle, getText());
    });

    saveAsButton?.addEventListener('click', async () => {
        const newHandle = await window.showSaveFilePicker();
        await writeFileBackToDisk(newHandle, getText());
        setCurrentFileHandle(newHandle);
    });
}
