
import * as pdf from 'html-pdf';
import * as ejs from 'ejs';

export const createPdf = async (data) => {
    return new Promise ((resolve, reject) => {
        // pdf generate options
        let options = {
            "height": "20in",
            "width": "20in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };

        try {
            ejs.renderFile('./report-template.ejs', {data: data}, (err, report) => {
                if (err) {
                    reject(err);
                } else {
                    pdf.create(report, options).toFile("/home/rajibhasan/Desktop/gifBuzTestfile/report/Report_2.pdf", (err, report) => {
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