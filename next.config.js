const { ESLint } = require("eslint")

/** @type {import('next').NextConfig} */
const nextconfig = {
    eslint: {
        ignoreDuringBuilds:true,
    },
}

module.exports = nextconfig