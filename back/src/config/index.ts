import { configDotenv } from "dotenv";

configDotenv();

const config = {
    app_name: process.env['APP_NAME'] ?? 'Sample',
    app_port: process.env['PORT'] ?? 3000,
    aws: {
        bucket: process.env['AWS_S3_BUCKET'],
        region: process.env['AWS_REGION'],
        access_key: process.env['AWS_ACCESS_KEY_ID'],
        secret_key: process.env['AWS_SECRET_ACCESS_KEY'],
    }

}

export default config;