# [Web File Handling Demo](https://cranky-shaw-fe95e8.netlify.app/)

The purpose of this demo app is to show the different ways in which files can be handled on the web.

Read [my blog post](https://patrickbrosset.com/articles/2021-10-22-handling-files-on-the-web/) for more information about this.

The app supports the following features:

* Importing files:
  * Using a `<input type=file>` input.
  * Using drag and drop.
  * Pasting a file.
  * As a PWA share target.
  * As a PWA file handler.
  * Using the `File System Access` API to open a file (or re-open a previously opened file).
* Exporting files:
  * Using a `<a download>` element.
  * Using the `Web Share` API.
  * Using the `File System Access` API to save back to the file, or save as a new file.

## Building locally

* `npm install`
* `npm run build`
* Then start a web server from the `public` directory.

## Browser support

🖥 = limited to desktop platforms  
📦 = requires installation  
🚧 = experimentally supported  
✅/⛔️ without label = applies to all platforms (iOS only counts for Safari)

||  Chrome | Edge | Safari | Firefox | 
| --- | --- | --- | --- | --- |
| `<input type=file>` | ✅ | ✅ | ✅ | ✅ | 
| 🖥 Drag and drop file | ✅ | ✅ | ✅ | ✅ | 
| Paste file | ✅ Windows<br>✅ macOS<br>⛔️ Android* | ✅ Windows<br>✅ macOS<br>⛔️ Android* | ✅ | ⛔️ ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1699743)) | 
| 📦 Web Share Target | ⛔️ Windows†<br>⛔️ macOS<br>✅ Android† | ✅ Windows†<br>⛔️ macOS<br>⛔️ Android† | ⛔️ | ⛔️ | 
| 📦 File Handling ([?][fh]) | 🚧 Windows<sup>‡</sup><br>⛔️ macOS<br>⛔️ Android | ❓ Windows<sup>‡</sup><br>⛔️ macOS<br>⛔️ Android | ⛔️ | ⛔️ | 
| File System Access | ✅ Windows<br>✅ macOS<br>⛔️ Android | ✅ Windows<br>✅ macOS<br>⛔️ Android | ❓<sup>§</sup> | ⛔️ | 
| `<a download>` | ✅ | ✅ | ✅ | ✅ | 
| Share file<br>(`navigator.share`) | ✅ Windows<br>⛔️ macOS ([bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1162971))<br>✅ Android | ✅ | ✅ | ⛔️ ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1635700)) | 

*On Android, it is not possible to paste files to the web because the [clipboard can’t contain files](https://stackoverflow.com/questions/30660771/how-to-copy-images-files-to-clipboard-in-android-any-alternative-methods-steps).  
†On Windows, only PWAs installed through Edge appear in the system’s share dialog. On Android, only PWAs installed through Chrome appear in the system’s share dialog.  
‡File Handling is [experimentally supported](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/handle-files) in Edge on Windows, but when choosing to open a text file in the demo app (“Open with…”), the app opens in its default state without the file’s contents; see [#5](https://github.com/captainbrosset/file-handling-demo/issues/5).  
<sup>§</sup>File System Access is [experimentally supported](https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/) in Safari, but it doesn’t (yet) work in the demo app.

[fh]: https://github.com/WICG/file-handling/blob/main/explainer.md
