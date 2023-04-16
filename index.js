#!/usr/bin/env node
const axios = require('axios')
const fs = require('fs')
const open = require('open')
const commander = require('commander')

const getCommand = process.argv.slice(2)

let api_key = ""
let p = false
let n = false

getCommand.forEach((item) => {
    const check = item.split('=')
    if (check.includes("api_key")) {
        api_key = check[1]
    } else if (check.includes("p")) {
        p = true
    } else if (check.includes("n")) {
        n = true
    }
})

commander
    .option('-a, --api_key <api_key>', 'Set API key')
    .option('-p, --prompt <prompt...>', 'Set prompt text (multiple prompts separated by space)')
    .option('-n, --n <n>', 'Number of images to generate', parseInt)
    .parse(process.argv);

console.log("commander", commander, "testing")

if (api_key) {
    fs.writeFileSync('api_key.txt', api_key)
    console.log('API key saved successfully!');
} else if (p) {
    async function generateImage() {
        if (!fs.existsSync('api_key.txt')) {
            return console.log('Please set your API key first!')
        }
        const get_api_key = fs.readFileSync('api_key.txt', 'utf-8')
        try {
            const body = {
                prompt: process.argv.slice(2)[0],
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

