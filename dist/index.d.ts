import { Compiler } from 'webpack';
export declare class YoutudeDlDownloaderWebpackPlugin {
    private readonly platform;
    private readonly version;
    private readonly from;
    private readonly to;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
declare enum DownloadFrom {
    Github = "github",
    Website = "website"
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
export {};
