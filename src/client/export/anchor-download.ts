import { getText } from '../editor';

const downloadButton = document.querySelector('#anchor-download');

function download(text: string) {
    const data = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(data);

    const link = document.createElement('a');
    link.setAttribute('download', 'file.txt');
    link.setAttribute('href', url);
    link.click();
}

downloadButton?.addEventListener('click', () => {
    download(getText());
});
