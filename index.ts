import { Compiler } from "webpack";
import { resolve } from "path";
import { downloadFromWebsite, downloadFromGithub } from "./core";

export = YoutudeDlDownloaderWebpackPlugin;

class YoutudeDlDownloaderWebpackPlugin {
  private readonly options: YoutudeDlDownloaderWebpackPlugin.Options;

  constructor(options: YoutudeDlDownloaderWebpackPlugin.Options) {
    this.options.platform = options.platform || ["win32", "linux"];
    this.options.from =
      options.from || YoutudeDlDownloaderWebpackPlugin.DownloadFrom.Website;
    this.options.version = options.version || "lastest";

    if (!options.to) throw new Error("Cannot find 'to' option");

    this.options.to = options.to;
  }

  apply(compiler: Compiler) {
    const outputPath = resolve(compiler.options.output.path, this.options.to);
    const version = this.options.version;

    Array.from(this.options.platform).forEach((platform) => {
      switch (this.options.from) {
        case YoutudeDlDownloaderWebpackPlugin.DownloadFrom.Website:
          downloadFromWebsite(outputPath, platform);
          break;
        case YoutudeDlDownloaderWebpackPlugin.DownloadFrom.Github:
          downloadFromGithub(outputPath, version, platform);
          break;
      }
    });
  }
}

declare namespace YoutudeDlDownloaderWebpackPlugin {
  enum DownloadFrom {
    Github = "github",
    Website = "website",
  }

  interface Options {
    /**
     * A platform of youtube-dl (win32 or not)
     *
     * default: ['win32', 'linux']
     */
    platform?: string[] | string;
    /**
     * A github, website or releases
     *
     * default: 'website'
     */
    from?: DownloadFrom;
    /**
     * When {from: 'github'}, a version to download youtube-dl from github releases
     *
     * default: [lastest version]
     */
    version?: string;
    /**
     * A version to download youtube-dl
     */
    to: string;
  }
}
