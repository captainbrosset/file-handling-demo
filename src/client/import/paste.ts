import { emptyEditor, appendContent } from '../editor';

function handlePastedFiles(pastedItems: DataTransferItemList) {
    let emptied = false;

    for (const item of pastedItems) {
        if (item.kind === 'file') {
            if (!emptied) {
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
