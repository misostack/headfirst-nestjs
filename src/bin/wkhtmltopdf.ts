import * as wkhtmltopdf from 'wkhtmltopdf';
import * as fs from 'fs';
import * as path from 'path';
// wkhtmltopdf.command = ""
const generateFromURL = (filename, filepath, reportUrl) => {
  // Create a write stream to overwrite the data in the target file.
  var writeStream = fs.createWriteStream(filepath);
  let res = new Promise((resolve,reject) => {
    let readStream = wkhtmltopdf(reportUrl, 
      {}).pipe(writeStream);

      writeStream.on('error', (err) => {
        reject(err);
      });
      writeStream.on('finish', (err) => {
        console.log('[REPORT GENERATE PDF]: finished');
        resolve({
          filepath: filepath,
          filename: filename
        })
      });			
  })
  
  return res;
}
const generateReport = async() => {
  const ROOT_DIR = path.resolve(__dirname, '..', '..');
  const dirName = `${ROOT_DIR}/tmp/reports`;
  const filename = 'example.pdf';
  const reportUrl = 'https://devnotes.tamthapnhilap.site';
  if(!fs.existsSync(dirName)) fs.mkdirSync(dirName);
  let filepath = path.resolve(dirName, filename)
  try{
    let response = await generateFromURL(filename, filepath, reportUrl);
    return response;
  }catch(err){
    return err;
  }
}

const result = Promise.resolve(generateReport());
console.log(result);