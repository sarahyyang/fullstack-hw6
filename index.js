import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer.prompt([
    {
        name: "url",
        type: "input",
        message: "Enter URL for the QR code: ",
    },
    {
        name: "filename",
        type: "input",
        message: "Enter the QR code filename (without extension): ",
    },
  ]).then((answer) => {
    const qr_code = qr.image(answer.url, { type: 'png' });
    qr_code.pipe(fs.createWriteStream(`${answer.filename}.png`));

    const data = `URL: ${answer.url}\nFilename: ${answer.filename}.png`;
    fs.writeFile(`input.txt`, data, err => {
        if (err) throw err;
        console.log('QR code and user input saved successfully!');
    });
  })