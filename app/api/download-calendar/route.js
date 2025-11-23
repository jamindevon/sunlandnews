import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 });
  }

  try {
    // Security: only allow files from calendar-test directories
    if (!file.startsWith('/calendar-test/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    const filePath = join(process.cwd(), 'public', file);
    const fileContent = await readFile(filePath, 'utf-8');

    const fileName = file.split('/').pop();

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
