// import * as sass from "sass";
// import fs from "fs";

// function generateCSS() {
//   sass
//     .compileAsync(`${process.cwd()}/script/scss/main.scss`)
//     .then((data) => {
//       fs.writeFileSync(`${process.cwd()}/src/css/main.css`, data.css, (err) => {
//         if (err) {
//           console.error("An error occurred:", err);
//         } else {
//           console.log("File created successfully!");
//         }
//       });

//       if (data.sourceMap) {
//         // console.log(data.sourceMap)
//       }
//     })
//     .catch((err) => {
//       console.error("An error occurred during Sass compilation:", err);
//     });
// }

// generateCSS();

import { exec } from "child_process";

const command = "sass ./script/scss/main.scss ./src/css/main.css";

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
