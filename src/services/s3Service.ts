import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

export class S3Service {
    private s3: S3Client;
    private bucketName: string;
    private region: string;

    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME!;
        this.region = process.env.AWS_REGION!;
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const key = `uploads/${uuidv4()}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await this.s3.send(command);

        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }
}
