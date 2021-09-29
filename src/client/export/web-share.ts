import { showUnsupportedMessage } from '../unsupported';
import { getText } from '../editor';

const shareButton = document.querySelector('#web-share');

if (!navigator.share) {
    showUnsupportedMessage(shareButton?.parentElement, 'The Web Share API is not supported');
}

async function shareFile(text: string) {
    if (!navigator.share) {
        return;
    }

    try {
        await navigator.share({ text });
    } catch (e) {
        console.error('Error sharing the content', e);
    }
}

shareButton?.addEventListener('click', async () => {
    shareFile(getText());
});
