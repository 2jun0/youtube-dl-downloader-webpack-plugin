export {}

declare global {
  namespace NodeJS {
    interface Global {
      YTDLDWP_to: string
      YTDLDWP_platform: string | string[]
      YTDLDWP_version: string
    }
  }

  interface Window {
    YTDLDWP_to: string
    YTDLDWP_platform: string | string[]
    YTDLDWP_version: string
  }
}
