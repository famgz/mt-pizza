import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

function getNewImageName(file) {
  const extFromType = file.type.includes('/')
    ? file.type.split('/').slice(-1)[0]
    : '';

  const extFromName = file.name.includes('.')
    ? file.name.split('.').slice(-1)[0]
    : '';

  const ext = extFromType || extFromName || '.jpg';

  return `${uniqid()}.${ext}`;
}

async function getImageBuffer(file) {
  const chunks = [];
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  console.log(file);

  //upload the file
  if (file && file.type.includes('image')) {
    const s3Client = new S3Client({
      region: 'sa-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const newFileName = getNewImageName(file);

    const buffer = await getImageBuffer(file);

    const bucketName = 'famgz-food-ordering-app';
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        ACL: 'public-read',
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

    return Response.json(link);
  }

  return Response.json(true);
}
