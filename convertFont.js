import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// สำหรับ __dirname ใน ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontPath = {};
fontPath.font1 = path.resolve(__dirname, './src/assets/fonts/THSarabunNew/THSarabunNew.ttf');
fontPath.font2 = path.resolve(__dirname, './src/assets/fonts/THSarabunNew/THSarabunNew Bold.ttf');
fontPath.font3 = path.resolve(__dirname, './src/assets/fonts/THSarabunNew/THSarabunNew BoldItalic.ttf');
fontPath.font4 = path.resolve(__dirname, './src/assets/fonts/THSarabunNew/THSarabunNew Italic.ttf');
const outputPath = path.resolve(__dirname, './src/assets/pdf/vfs.js');

const base64Obj = {
    font1:'',
    font2:'',
    font3:'',
    font4:'',
}

for( i in 4) {
    const fontData = fs.readFileSync(fontPath[`font${i}`]);
    base64Obj[`font${i}`] = fontData.toString('base64');
}



const output = `exports.vfs = {
  "THSarabunNew.ttf": ${base64Obj.font1},
  "THSarabunNew-Bold.ttf": ${base64Obj.font2},
  "THSarabunNew-Italic.ttf": ${base64Obj.font3},
  "THSarabunNew-BoldItalic.ttf": ${base64Obj.font4}
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);

console.log('✅ แปลงฟอนต์เรียบร้อย:', outputPath);
