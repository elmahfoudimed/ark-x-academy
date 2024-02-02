const fs = require('fs');

function readFileAsync(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) reject(err);
            else resolve(data.toString());
        });
    })
}

function writeFileAsync(filePath, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, content, function (err) {
            if (err) reject(err);
            else resolve("Saved :)");
        })
    })
}

async function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
        try {
            const data = await readFileAsync(files[i]);
            const result = await writeFileAsync(files[i] + '_copy', data.toUpperCase());
            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = { readFileAsync, writeFileAsync, processFiles };