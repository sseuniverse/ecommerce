import * as sass from "sass";
import fs from "fs";

function generateCSS() {
  sass.compileAsync(`${process.cwd()}/script/main.scss`).then((data) => {
    fs.writeFileSync(`${process.cwd()}/src/css/output.css`, data.css, (err) => {
      if (err) {
        console.error("An error occurred:", err);
      } else {
        console.log("File created successfully!");
      }
    });
    // fs.writeFileSync(
    //   `${process.cwd()}/src/css/main.css.map`,
    //   data.sourceMap,
    //   (err) => {
    //     if (err) {
    //       console.error("An error occurred:", err);
    //     } else {
    //       console.log("Map file created successfully!");
    //     }
    //   }
    // );
  });
}

generateCSS();
