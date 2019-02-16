const   fs = require('fs'),
        path = require('path'),
        request = require('request'),
        exec = require('child_process').exec;

if(!fs.existsSync('./out')) fs.mkdirSync('./out');

async function download(url, mode)
{
    let media = await getURLMedia(url+'.json', mode);
    await media.forEach(m =>
    {
        downloadMedia(m[1], m[0]);
    });
    if(mode==0)
    {
        await mergeFiles();
    }
}

function getURLMedia(url, mode)
{
    return new Promise((resolve, reject) =>
    {
        request
        ({
            method: 'GET',
            url: url,
        },
        (error, response, body) =>
        {
            if(error) throw error;
            try
            {
                let x = JSON.parse(body),
                    v = x[0].data.children[0].data.media.reddit_video.fallback_url,
                    a = v.replace(v.split('/')[4], 'audio'),
                    res;
                if(a && v)
                {
                    switch(mode)
                    {
                        case 0:
                            res = [["audio.mp3",a], ["video.mp4",v]];
                        break;
                        case 1:
                            res = [["audio.mp3",a]];
                        break;
                        case 2:
                            res = [["video.mp4",v]];
                        break;
                        default:
                            res = [["audio.mp3",a], ["video.mp4",v]];
                    }
                    resolve(res);
                }
                else
                {
                    throw 'Unable to get video from URL';
                }
            }
            catch(err)
            {
                throw err;
            }
        });
    });
}

async function downloadMedia(url, fileName)
{
    await request
    .get(url)
    .on('error', err =>
    {
        throw err;
    })
    .pipe(fs.createWriteStream('./out/'+fileName));
}

async function mergeFiles()
{
    await exec('"'+path.join(__dirname + './ffmpeg.exe')+'"'+' -i "'+path.join(__dirname, '../out/video.mp4')+'"'+' -i "'+path.join(__dirname, '../out/audio.mp3')+'"'+' -map 0:v'+' -map 1:a'+' -c:v copy'+' -c:a copy'+' "'+path.join(__dirname, '../out/output.mp4')+'"'+' -y',
    (e, stdout, stderr) =>
    {  
        console.log('Check OUT folder :)');
    });
}

module.exports = {
    download
};