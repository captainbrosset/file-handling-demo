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

π₯ = limited to desktop platforms  
π¦ = requires installation  
π§ = experimentally supported  
β/βοΈ without label = applies to all platforms (iOS only counts for Safari)

||  Chrome | Edge | Safari | Firefox | 
| --- | --- | --- | --- | --- |
| `<input type=file>` | β | β | β | β | 
| π₯ Drag and drop file | β | β | β | β | 
| Paste file | β Windows<br>β macOS<br>βοΈ Android* | β Windows<br>β macOS<br>βοΈ Android* | β | βοΈ ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1699743)) | 
| π¦ Web Share Target | βοΈ Windowsβ <br>βοΈ macOS<br>β Androidβ  | β Windowsβ <br>βοΈ macOS<br>βοΈ Androidβ  | βοΈ | βοΈ | 
| π¦ File Handling ([?][fh]) | π§ Windows<sup>β‘</sup><br>βοΈ macOS<br>βοΈ Android | β Windows<sup>β‘</sup><br>βοΈ macOS<br>βοΈ Android | βοΈ | βοΈ | 
| File System Access | β Windows<br>β macOS<br>βοΈ Android | β Windows<br>β macOS<br>βοΈ Android | β<sup>Β§</sup> | βοΈ | 
| `<a download>` | β | β | β | β | 
| Share file<br>(`navigator.share`) | β Windows<br>βοΈ macOS ([bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1162971))<br>β Android | β | β | βοΈ ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1635700)) | 

*On Android, it is not possible to paste files to the web because the [clipboard canβt contain files](https://stackoverflow.com/questions/30660771/how-to-copy-images-files-to-clipboard-in-android-any-alternative-methods-steps).  
β On Windows, only PWAs installed through Edge appear in the systemβs share dialog. On Android, only PWAs installed through Chrome appear in the systemβs share dialog.  
β‘File Handling is [experimentally supported](https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/handle-files) in Edge on Windows, but when choosing to open a text file in the demo app (βOpen withβ¦β), the app opens in its default state without the fileβs contents; see [#5](https://github.com/captainbrosset/file-handling-demo/issues/5).  
<sup>Β§</sup>File System Access is [experimentally supported](https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/) in Safari, but it doesnβt (yet) work in the demo app.

[fh]: https://github.com/WICG/file-handling/blob/main/explainer.md
