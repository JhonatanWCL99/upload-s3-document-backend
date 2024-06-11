export const EnvConfiguration = () => ({
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3000,
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_s3_bucket: process.env.AWS_S3_BUCKET,
    aws_region: process.env.AWS_REGION,
});
