import { emptyEditor, appendContent } from '../editor';
import { setCurrentFileHandle } from './file-system-access';

function handlePastedFiles(pastedItems: DataTransferItemList) {
    let emptied = false;

    for (const item of pastedItems) {
        if (item.kind === 'file') {
            if (!emptied) {
                // Force nullify the current file system access API handle. 
                // Since we just dropped a file, the previously opened file (if any)
                // doesn't exist anymore, so we shouldn't allow saving it back to disk .
                setCurrentFileHandle(null);

                emptyEditor();
                emptied = true;
            }

            // Note that we're not using await here to do this async.
            // The DataTransferItemList seems to get emptied after an async step, so we
            // have to access all items synchronously.
            item.getAsFile()?.text().then((text: string) => {
                appendContent(text);
            });
        }
    }
}

document.addEventListener('paste', e => {
    const pastedItems = e.clipboardData?.items;
    if (!pastedItems) {
        return;
    }

    handlePastedFiles(pastedItems);
});
