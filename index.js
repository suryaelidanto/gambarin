const axios = require('axios')
const fs = require('fs')
const open = require('open')
const commander = require('commander')

commander
    .option('-a, --api_key <api_key>', 'Set API key')
    .option('-p, --prompt <prompt...>', 'Set prompt text (multiple prompts separated by space)')
    .option('-n, --n <n>', 'Number of images to generate', parseInt)
    .parse(process.argv);

const { api_key, prompt, n } = commander

console.log(api_key, prompt, n);

if (api_key) {
    fs.writeFileSync('api_key.txt', api_key)
    console.log('API key saved successfully!');
} else if (prompt) {
    async function generateImage() {
        if (!fs.existsSync('api_key.txt')) {
            return console.log('Please set your API key first!')
        }
        const get_api_key = fs.readFileSync('api_key.txt', 'utf-8')
        try {
            const body = {
                prompt: prompt.join(' '),
                n: n ? n : 1,
                size: "512x512"
            }
            const response = await axios.post(`https://api.openai.com/v1/images/generations`, body, {
                headers: {
                    Authorization: `Bearer ${get_api_key}`
                },
            })
            console.log("==> Created By : SuryaElz")
            console.log("==> Follow Me : https://github.com/suryaa6666")
            response.data.data.forEach(item => {
                console.log("==> Your image : ", item.url)
                open(item.url)
            })
        } catch (err) {
            console.log(`There is an error when generating image : ${err.message}`)
        }
    }

    generateImage()
} else {
    console.log('Please provide a correct command!')
}