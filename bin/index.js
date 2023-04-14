#!/usr/bin/env node
import axios from 'axios'
import fs from 'fs'
import open from 'open'

const getCommand = process.argv.slice(2)

let api_key = ""
let p = false

getCommand.forEach((item) => {
    const check = item.split('=')
    if (check.includes("api_key")) {
        api_key = check[1]
    } else if (check.includes("p")) {
        p = true
    }
})

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
                n: 1,
                size: "512x512"
            }
            const response = await axios.post(`https://api.openai.com/v1/images/generations`, body, {
                headers: {
                    Authorization: `Bearer ${get_api_key}`
                },
            })
            console.log("==> Created By : SuryaElz")
            console.log("==> Follow Me : https://github.com/suryaa6666")
            console.log("==> Your image : ", response.data.data[0].url)
            open(response.data.data[0].url)
        } catch (err) {
            console.log(`There is an error when generating image : ${err.message}`)
        }
    }

    generateImage()
} else {
    console.log('Please provide a correct command!')
}

