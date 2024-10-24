const express = require("express");
const app = express();
const multer = require("multer");
const { sliceModel } = require("./slice");
const path = require("path");
require("dotenv").config();
const { dirname } = require("path");
const appDir = dirname(require.main.filename);

app.use(express.urlencoded({ extended: false, limit: "50mb" }));

console.log(process.env.NODE_PATH);

const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${appDir}/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/slice", upload.single("uploaded_file"), (req, res) => {
  // percentage should be float between 0 and 1
  const infillPercentage = req.body.infill_percentage; 
  const lineWidth = req.body.line_width;
  const machine_nozzle_size = req.body.machine_nozzle_size;
  const material_bed_temperature = req.body.material_bed_temperature;
  const material_print_temperature = req.body.material_print_temperature;
  const layer_height = req.body.layer_height;
  // infill line distance = line width / infill percentage

  infill_line_distance = lineWidth / infillPercentage;

  console.log(req.file);
  sliceModel(req.file.filename, infill_line_distance, machine_nozzle_size, material_bed_temperature, material_print_temperature, layer_height);
  res.download(`${appDir}/outputs/${req.file.filename.split(".")[0]}.gcode`);
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
