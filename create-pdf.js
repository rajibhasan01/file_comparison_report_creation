
import * as pdf from 'html-pdf';
import * as ejs from 'ejs';
import * as fs from 'fs';

//internal import
import { alphNumericName } from './generateUniqueId.js';

export const createPdf = async (data, targetDir) => {
    return new Promise ((resolve, reject) => {
        // pdf generate options
        let options = {
            "height": "20in",
            "width": "22in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };

        const reportDir = `${targetDir}/report/${alphNumericName()}.pdf`;

        if (!fs.existsSync(`${targetDir}/report`)) {
            fs.mkdirSync(`${targetDir}/report`);
        }

        try {
            ejs.renderFile('./report-template_new.ejs', {data: data}, (err, report) => {
                if (err) {
                    reject(err);
                } else {
                    pdf.create(report, options).toFile(reportDir, (err, report) => {
                        if(err){
                            reject(err);
                        } else {
                            resolve(report);
                        }
                    })
                }
            })

        } catch (error) {
            console.log('Error occurred while creating pdf!', error);
            throw error;
        }
    }).catch((error) => {
        throw error;
    })

};