import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export async function GET() {
	try {
		const files = await prisma.file.findMany();
		console.log(files);
		return json(files);
	} catch (error) {
		return json({ error: 'Database error' }, { status: 500 });
	}
}

export async function POST({ request }) {
	const formData = await request.formData();
	const file = formData.get('file') as File;
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const category = formData.get("category") as string;
	const language = formData.get("language") as string;
	const provider = formData.get("provider") as string;
	const role = formData.get("role") as string;
	const view_count = formData.get("view_count") as string;

	if (!file) {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const uploadDir = path.resolve('static/uploads');

		await fs.mkdir(uploadDir, { recursive: true });
		const filePath = path.join(uploadDir, file.name);
		await fs.writeFile(filePath, buffer);

		const savedFile = await prisma.file.create({
			data: {
				title: title,
				description: description,
				category: category,
				language: language,
				provider: provider,
				role: role,
				file_path: `/uploads/${file.name}`,
				view_count: 0,
			}
		});

		return json(savedFile);
	} catch (err) {
		console.error('Error during file upload:', err);
		return json({ error: 'Something went wrong', detail: err.message }, { status: 500 });
	}
}

export async function PATCH({ request }) {
	console.log(request);
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
