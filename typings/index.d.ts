import { Compiler } from 'webpack';

export enum DownloadFrom {
  Github = 'github',
  Website = 'website',
}

export interface Options {
  /**
   * A platform of youtube-dl ('win32', 'auto' or 'not')
   *
   * default: ['win32', 'unix']
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

declare module 'youtube-dl-download-webpack-plugin' {
  export default class YoutudeDlDownloaderWebpackPlugin {
    private readonly platform;
    private readonly version;
    private readonly from;
    private readonly to;
    constructor(options: Options);
    apply(compiler: Compiler): void;
  }
}
