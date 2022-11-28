const {readFile, writeFile} = require("fs")
const util = require('util');
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

const start = async () => {
    const first = await readFilePromise("./exampleFolder/newFolderText.txt", 'utf-8')
    const second = await readFilePromise("./exampleFolder/second/data.txt", 'utf-8')
    await writeFilePromise("./exampleFolder/awesometext.txt", `THIS IS AWESOME: ${second}`, {flag: 'a'})
    console.log(first, second)

}

start()