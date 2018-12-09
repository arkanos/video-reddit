const   request = require('request'),
        fs = require('fs');

if(!fs.existsSync('./out')) fs.mkdirSync('./out');

async function download(url, mode)
{
    let media = await getURLMedia(url+'.json', mode);
    await media.forEach(m =>
    {
        downloadMedia(m[1], m[0]);
    });
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
                            res = [["audio",a], ["video",v]];
                        break;
                        case 1:
                            res = [["audio",a]];
                        break;
                        case 2:
                            res = [["video",v]];
                        break;
                        default:
                            res = [["audio",a], ["video",v]];
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
    .pipe(fs.createWriteStream('./out/'+fileName+'.mp4'));
}

module.exports = {
    download
};