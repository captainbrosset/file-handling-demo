import { showUnsupportedMessage } from '../unsupported';
import { getText } from '../editor';

// Typescript doesn't know about navigator.canShare yet. Let's teach it.
declare global {
    interface Navigator {
        canShare: (data: {}) => Boolean
    }
}

const shareButton = document.querySelector('#web-share');

if (!navigator.share) {
    showUnsupportedMessage(shareButton?.parentElement, 'The Web Share API is not supported');
}

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
