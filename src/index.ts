import os from 'os'
import { Compiler } from 'webpack'
import { resolve } from 'path'
import { downloadFromWebsite, downloadFromGithub } from './core'
import { type Options, DownloadFrom } from './options'

declare let global: any

class YoutudeDlDownloaderWebpackPlugin {
  private readonly platform: string | string[]
  private readonly version: string
  private readonly from: string
  private readonly to: string
  private readonly enableDefine: boolean

  constructor(options: Options) {
    if (options.platform === 'auto') {
      this.platform = os.type() === 'Windows_NT' ? 'win32' : 'unix'
    } else {
      this.platform = options.platform || ['win32', 'unix']
    }

    this.from = options.from || DownloadFrom.Website
    this.version = options.version || 'lastest'

    if (!options.to) throw new Error("Cannot find 'to' option")

    this.to = options.to
    this.enableDefine = options.enableDefine ?? true
  }

  apply(compiler: Compiler) {
    const outputPath = resolve(compiler.options.output.path as string, this.to)
    const version = this.version

    Array.from(this.platform).forEach(platform => {
      switch (this.from) {
        case DownloadFrom.Website:
          downloadFromWebsite(outputPath, platform)
          break
        case DownloadFrom.Github:
          downloadFromGithub(outputPath, version, platform)
          break
      }
    })

    if (this.enableDefine) {
      global.YTDLDWP_to = this.to
      global.YTDLDWP_platform = this.platform
      global.YTDLDWP_version = this.version
    }
  }
}

export { YoutudeDlDownloaderWebpackPlugin, Options, DownloadFrom }
