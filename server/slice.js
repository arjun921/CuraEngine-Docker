const execSync = require("child_process").execSync;

const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const filePath = `${appDir}/uploads`;

const sliceModel = (
  input_file,
  printer_def = "/exported_profile/ender3/0.2@0.6noz/creality_ender3.def.json" 
  // printer_def = "/exported_profile/profile/Cura/creality_ender3.def.json" # Doesnt work, created using unziped .3mf file after project to disk
  
  
) => {
  console.log("hello");
  const outputPath = `${appDir}/outputs/${input_file.split(".")[0]}.gcode`;
  const output = execSync(
    `CuraEngine slice -v -j ${printer_def} -o ${outputPath}  -l ${filePath}/${input_file}`,
    { encoding: "utf-8" }
  ); // the default is 'buffer'

  console.log("Output was:\n", output);
};

module.exports = { sliceModel };
