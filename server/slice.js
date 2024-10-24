const execSync = require("child_process").execSync;

const { dirname } = require("path");
const appDir = dirname(require.main.filename);
const filePath = `${appDir}/uploads`;

const sliceModel = (
  input_file,
  infill_line_distance,
  machine_nozzle_size,
  material_bed_temperature,
  material_print_temperature,
  printer_def = "/exported_profile/ender3/default/creality_ender3.def.json" 
  // printer_def = "/exported_profile/profile/Cura/creality_ender3.def.json" # Doesnt work, created using unziped .3mf file after project to disk
  
  
) => {
  console.log("hello");
  const outputPath = `${appDir}/outputs/${input_file.split(".")[0]}.gcode`;
  const output = execSync(
    `CuraEngine slice -v -j ${printer_def} -o ${outputPath} \
    -s infill_line_distance=${infill_line_distance} \
    -s machine_nozzle_size=${machine_nozzle_size} \
    -s default_material_print_temperature=${material_print_temperature} \
    -s material_print_temperature=${material_print_temperature} \
    -s material_print_temperature_layer_0=${material_print_temperature} \
    -s material_initial_print_temperature=${material_print_temperature} \
    -s material_final_print_temperature=${material_print_temperature} \
    -s material_standby_temperature=${material_print_temperature} \
    -s default_material_bed_temperature=${material_bed_temperature} \
    -s material_bed_temperature=${material_bed_temperature} \
    -s material_bed_temperature_layer_0=${material_bed_temperature} \
    -l ${filePath}/${input_file}`,
    { encoding: "utf-8" }
  ); // the default is 'buffer'

  console.log("Output was:\n", output);
};

module.exports = { sliceModel };
