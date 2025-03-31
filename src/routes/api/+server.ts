import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export async function GET() {
	try {
		const files = await prisma.file.findMany();
		return json(files);
	} catch (error) {
		return json({ error: 'Database error' }, { status: 500 });
	}
}

export async function POST({ request }) {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const category = formData.get('category') as string;
		const language = formData.get('language') as string;
		const provider = formData.get('provider') as string;
		const role = formData.get('role') as string;

		if (!file) return new Response('No file', { status: 400 });

		const file_check = await prisma.file.findUnique({where: { title: title }});
		if (file_check !== null) return new Response('Same file exist', { status: 400 });

		const buffer = Buffer.from(await file.arrayBuffer());

		const result = await new Promise((resolve, reject) => {
			cloudinary.uploader.upload_stream(
				{
					folder: 'fileUpload',
					use_filename: true,
					unique_filename: true,
					resource_type: 'auto',
				},
				(err, res) => (err ? reject(err) : resolve(res))
			).end(buffer);
		});

		const savedFile = await prisma.file.create({
			data: {
				title: title,
				description: description,
				category: category,
				language: language,
				provider: provider,
				role: role,
				view_count: 0,
				cloudinary_url: result.secure_url,
				cloudinary_public_id: result.public_id
			}
		});

		return json(savedFile);
	} catch (err) {
		console.error('Error during file upload:', err);
		return json({ error: 'Something went wrong', detail: err.message }, { status: 500 });
	}
}

export async function PATCH({ request }) {
	const { title_string, view_number } = await request.json();
	try {
		const updatedFile = await prisma.file.update({
			where: { title: title_string },
			data: {
				view_count: view_number
			},
		});

		return json({ message: 'File updated successfully', file: updatedFile });
	} catch (error) {
		return json({ error: 'Failed to update file' }, { status: 500 });
	}
}
