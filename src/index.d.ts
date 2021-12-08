import { Compiler } from 'webpack';

export default YoutudeDlDownloaderWebpackPlugin;

declare class YoutudeDlDownloaderWebpackPlugin {
  private readonly platform;
  private readonly version;
  private readonly from;
  private readonly to;
  constructor(options: YoutudeDlDownloaderWebpackPlugin.Options);
  apply(compiler: Compiler): void;
}

declare namespace YoutudeDlDownloaderWebpackPlugin {
  enum DownloadFrom {
    Github = 'github',
    Website = 'website',
  }

  interface Options {
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
}
