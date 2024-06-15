import AWS from 'aws-sdk';

import config from '../config';

export const uploadToS3 = async (file: any, bucketName: string) => {

    try {
        const s3 = new AWS.S3({
            credentials: {
                accessKeyId: 'AKIAZQ3DOLOUUD4H2XDW' || '',
                secretAccessKey: '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' || '',
            }

        })

        const newFileName: string = `sound_${Date.now().toString()}.${file.mimetype.split('/')[1]}`;
        const params = {
            Bucket: bucketName,
            Key: newFileName,
            Body: file.data
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, {}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })


    } catch (error) {
        console.log(error);

    }
}