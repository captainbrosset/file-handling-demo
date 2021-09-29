import { get, del } from 'idb-keyval';
import { emptyEditor, appendContent } from '../editor';

const SHARE_TARGET_ID = 'pwa-file-shared';

async function checkOnStartup() {
    // Check if the service worker stored a file for us to open.
    const text = await get(SHARE_TARGET_ID);

    if (text && text.length) {
        emptyEditor();
        appendContent(text);

        // If we handled a file, clear it now to avoid always opening it on launch.
        await del(SHARE_TARGET_ID);
    }
}

checkOnStartup();
