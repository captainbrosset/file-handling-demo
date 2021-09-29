export function showUnsupportedMessage(parent: HTMLElement|null|undefined, message: string) {
    if (!parent) {
        console.error(message);
        return;
    }

    const messageEl = document.createElement('p');
    messageEl.classList.add('unsupported');
    messageEl.textContent = message;

    parent.appendChild(messageEl);
}
