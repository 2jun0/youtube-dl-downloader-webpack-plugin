import fs from 'fs';
import https from 'https';

function downloadFile(fileUrl, filePath) {
  return new Promise(async (resolve, reject) => {
    while (true) {
      let res = await new Promise((resolve, reject) => https.get(fileUrl, httpRes => {
        httpRes.on('error', e => reject(e));
        resolve(httpRes);
      }));
      if (res.headers.location) fileUrl = res.headers.location;else {
        res.pipe(fs.createWriteStream(filePath));
        res.on('error', e => reject(e));
        res.on('end', () => res.statusCode == 200 ? resolve(res) : reject(res));
        break;
      }
    }
  });
}

function getGithubReleases(page = 1, perPage = 1) {
  return new Promise((resolve, reject) => {
    const apiURL = `https://api.github.com/repos/ytdl-org/youtube-dl/releases?page=${page}&per_page=${perPage}`;
    https.get(apiURL, {
      headers: {
        'User-Agent': 'node'
      }
    }, res => {
      let resStr = '';
      res.setEncoding('utf8');
      res.on('data', body => resStr += body);
      res.on('error', e => reject(e));
      res.on('end', () => res.statusCode == 200 ? resolve(JSON.parse(resStr)) : reject(res));
    });
  });
}

export async function downloadFromWebsite(filePath, platform) {
  const fileName = platform == 'win32' ? 'youtube-dl.exe' : 'youtube-dl';
  if (!filePath) filePath = `./${fileName}`;
  const fileUrl = `https://youtube-dl.org/downloads/latest/${fileName}`;
  return await downloadFile(fileUrl, filePath);
}
export async function downloadFromGithub(filePath, version, platform) {
  const fileName = platform == 'win32' ? 'youtube-dl.exe' : 'youtube-dl';
  if (!version) version = (await getGithubReleases(1, 1))[0].tag_name;
  if (!filePath) filePath = `./${fileName}`;
  let fileURL = `https://github.com/ytdl-org/youtube-dl/releases/download/${version}/${fileName}`;
  return await downloadFile(fileURL, filePath);
}