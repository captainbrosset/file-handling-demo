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
