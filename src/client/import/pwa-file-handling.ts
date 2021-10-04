import { showUnsupportedMessage } from '../unsupported';
import { emptyEditor, appendContent } from '../editor';
import { setCurrentFileHandle } from './file-system-access';

declare global {
    interface Window { launchQueue: any; }
    interface LaunchParams {
        readonly files: FileSystemFileHandle[];
    }
}

async function handleFile(fileHandle: FileSystemFileHandle) {
    // Tell the file system access module about this new file handle, this way
    // we can save changes back to disk directly.
    setCurrentFileHandle(fileHandle);

    const file = await fileHandle.getFile();
    const text = await file.text();

    await appendContent(text);
}

if ('launchQueue' in window) {
    window.launchQueue.setConsumer((params: LaunchParams) => {
        if (!params.files.length) {
            return;
        }

        emptyEditor();
        for (const file of params.files) {
            handleFile(file);
        }
    });
} else {
    const sidebarEl = document.querySelector<HTMLElement>('.file-handling');
    showUnsupportedMessage(sidebarEl, 'PWA File Handling is not supported');
}
