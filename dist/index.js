import { resolve } from 'path';
import { downloadFromWebsite, downloadFromGithub } from './core';
export class YoutudeDlDownloaderWebpackPlugin {
  constructor(options) {
    this.platform = options.platform || ['win32', 'linux'];
    this.from = options.from || DownloadFrom.Website;
    this.version = options.version || 'lastest';
    if (!options.to) throw new Error("Cannot find 'to' option");
    this.to = options.to;
  }

  apply(compiler) {
    const outputPath = resolve(compiler.options.output.path, this.to);
    const version = this.version;
    Array.from(this.platform).forEach(platform => {
      switch (this.from) {
        case DownloadFrom.Website:
          downloadFromWebsite(outputPath, platform);
          break;

        case DownloadFrom.Github:
          downloadFromGithub(outputPath, version, platform);
          break;
      }
    });
  }

}
var DownloadFrom;

(function (DownloadFrom) {
  DownloadFrom["Github"] = "github";
  DownloadFrom["Website"] = "website";
})(DownloadFrom || (DownloadFrom = {}));