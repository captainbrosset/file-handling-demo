import { emptyEditor, appendContent, markAsDragOver } from '../editor';
import { setCurrentFileHandle } from './file-system-access';

const dropEl = document.querySelector('.content-wrapper');

dropEl?.addEventListener('dragover', e => {
    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();
    markAsDragOver(true);
});

dropEl?.addEventListener('dragleave', e => {
    markAsDragOver(false);
});

dropEl?.addEventListener('drop', async e => {
    markAsDragOver(false);

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    const dataTransfer = (e as DragEvent).dataTransfer;

    if (!dataTransfer) {
        return;
    }

    // Force nullify the current file system access API handle. 
    // Since we just dropped a file, the previously opened file (if any) doesn't exist
    // anymore, so we shouldn't allow saving it back to disk .
    setCurrentFileHandle(null);

    emptyEditor();

    if (dataTransfer.items) {
        for (const file of dataTransfer.items) {
            if (file.kind === 'file') {
                const text = await file.getAsFile()?.text();
                if (text) {
                    appendContent(text);
                }
            }
        }
    } else {
        for (const file of dataTransfer.files) {
            const text = await file.text();
            if (text) {
                appendContent(text);
            }
        }
    }
});
