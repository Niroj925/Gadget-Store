import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
    constructor(private readonly configService: ConfigService) { }

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION'),
        credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        }
    });


    async upload(fileName: string, file: Buffer) {
        const bucketName = this.configService.get<string>('AWS_S3_BUCKET');
        const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
        const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
        const uniqueFileName = `${Date.now()}${fileExtension}`;
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: uniqueFileName,
                Body: file,
            }),
        );
        const s3Url = `https://${bucketName}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${uniqueFileName}`;
        return s3Url;
    }
}
