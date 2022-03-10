import { showUnsupportedMessage } from '../unsupported';
import { getText } from '../editor';

// Typescript doesn't know about navigator.canShare yet. Let's teach it.
declare global {
    interface Navigator {
        canShare: (data: {}) => Boolean
    }
}

const shareButton = document.querySelector('#web-share');

// Test for support.
let isSupported = true;

if (!navigator.share) {
    showUnsupportedMessage(shareButton?.parentElement, 'The Web Share API is not supported');
    shareButton?.remove();
    isSupported = false;
}

if (!navigator.canShare) {
    showUnsupportedMessage(shareButton?.parentElement, 'The navigator.canShare function is missing');
    shareButton?.remove();
    isSupported = false;
} else {
    // Create a dummy file to test if the browser can share it with canShare.
    const testFile = new File(['test'], 'test-file.txt', { type: 'text/plain' });
    if (!navigator.canShare({ files: [testFile] })) {
        showUnsupportedMessage(shareButton?.parentElement, 'The browser does not support sharing files');
        shareButton?.remove();
        isSupported = false;
    }
}

if (isSupported) {
    async function shareAsFile(text: string) {
        if (!navigator.share) {
            return;
        }

        const file = new File(text.split('\n'), 'shared-file.txt', { type: 'text/plain' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({ files: [file] });
            } catch (e) {
                console.error('Error sharing the content', e);
            }
        }
    }

    shareButton?.addEventListener('click', async () => {
        shareAsFile(getText());
    });
}
