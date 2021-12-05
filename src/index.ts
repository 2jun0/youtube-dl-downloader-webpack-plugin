import { Compiler } from 'webpack';
import { resolve } from 'path';
import { downloadFromWebsite, downloadFromGithub } from './core';

export class YoutudeDlDownloaderWebpackPlugin {
  private readonly platform: string | string[];
  private readonly version: string;
  private readonly from: string;
  private readonly to: string;

  constructor(options: Options) {
    this.platform = options.platform || ['win32', 'linux'];
    this.from = options.from || DownloadFrom.Website;
    this.version = options.version || 'lastest';

    if (!options.to) throw new Error("Cannot find 'to' option");

    this.to = options.to;
  }

  apply(compiler: Compiler) {
    const outputPath = resolve(compiler.options.output.path as string, this.to);
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

enum DownloadFrom {
  Github = 'github',
  Website = 'website',
}

interface Options {
  /**
   * A platform of youtube-dl (win32 or not)
   *
   * default: ['win32', 'linux']
   */
  platform?: string[] | string;
  /**
   * 'github' or 'website'; server where would like to download
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
