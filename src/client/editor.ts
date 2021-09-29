let editor: HTMLTextAreaElement|null;

const root = document.querySelector<HTMLElement>('.content-wrapper');
if (root) {
    editor = document.createElement('textarea');
    editor.classList.add('editor');
    editor.value = `Welcome to the Web File Handling demo app!

* Choose an import option on the left to open a file.
* Make changes.
* Export the file again by choosing one of the exporting options on the right`;

    root.appendChild(editor);
}

export function getText(): string {
    if (!editor) {
        return '';
    }

    return editor.value;
}

export function emptyEditor() {
    if (!editor) {
        return;
    }

    editor.value = '';
}

export function appendContent(text: string) {
    if (!editor) {
        return;
    }

    editor.value += text;
}

export function markAsDragOver(state: boolean) {
    editor?.classList.toggle('drag-over', state);
}
