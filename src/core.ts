// The MIT License (MIT)
// Copyright © 2021 2jun0, ghjbnm
// This code is modified to the repo https://github.com/ghjbnm/youtube-dl-wrap
import fs from 'fs'
import { resolve } from 'path'
import https from 'https'
import { IncomingMessage } from 'http'

function downloadFile(fileUrl: string, filePath: string) {
  return new Promise(async (resolve, reject) => {
    while (true) {
      let res: IncomingMessage = await new Promise((resolve, reject) =>
        https.get(fileUrl, httpRes => {
          httpRes.on('error', e => reject(e))
          resolve(httpRes)
        }),
      )

      if (res.headers.location) fileUrl = res.headers.location
      else {
        res.pipe(fs.createWriteStream(filePath))
        res.on('error', e => reject(e))
        res.on('end', () =>
          res.statusCode == 200 ? resolve(res) : reject(res),
        )
        break
      }
    }
  })
}

function getGithubReleases(page = 1, perPage = 1): Promise<any> {
  return new Promise((resolve, reject) => {
    const apiURL = `https://api.github.com/repos/ytdl-org/youtube-dl/releases?page=${page}&per_page=${perPage}`
    https.get(apiURL, { headers: { 'User-Agent': 'node' } }, res => {
      let resStr = ''
      res.setEncoding('utf8')
      res.on('data', body => (resStr += body))
      res.on('error', e => reject(e))
      res.on('end', () =>
        res.statusCode == 200 ? resolve(JSON.parse(resStr)) : reject(res),
      )
    })
  })
}

export async function downloadFromWebsite(dirPath: string, platform: string) {
  const fileName = platform == 'win32' ? 'youtube-dl.exe' : 'youtube-dl'
  const filePath = dirPath ? resolve(dirPath, fileName) : `./${fileName}`
  const fileUrl = `https://youtube-dl.org/downloads/latest/${fileName}`
  return await downloadFile(fileUrl, filePath)
}

export async function downloadFromGithub(
  dirPath: string,
  version: string,
  platform: string,
) {
  const fileName = platform == 'win32' ? 'youtube-dl.exe' : 'youtube-dl'
  if (!version) version = (await getGithubReleases(1, 1))[0].tag_name
  const filePath = dirPath ? resolve(dirPath, fileName) : `./${fileName}`
  const fileURL = `https://github.com/ytdl-org/youtube-dl/releases/download/${version}/${fileName}`
  return await downloadFile(fileURL, filePath)
}
