import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// This secret should match the one configured in your Sanity webhook
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-webhook-secret';

export async function POST(request) {
  try {
    const body = await request.json();
    const { secret, type, slug } = body;

    // Validate the request has the correct secret
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ success: false, message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate based on content type
    if (type === 'post') {
      // Revalidate the specific post page
      if (slug) {
        revalidatePath(`/post/${slug}`);
      }
      
      // Always revalidate the stories pages and homepage
      revalidatePath('/', 'page');
      revalidatePath('/stories');
      revalidatePath('/stories/category/[id]', 'page');
      
      return NextResponse.json({ 
        success: true, 
        revalidated: true,
        message: `Revalidated post: ${slug}` 
      });
    }
    
    if (type === 'category') {
      // Revalidate category pages and homepage
      revalidatePath('/', 'page');
      revalidatePath('/stories/category/[id]', 'page');
      revalidatePath('/stories');
      
      return NextResponse.json({ 
        success: true, 
        revalidated: true,
        message: 'Revalidated category pages' 
      });
    }

    // General revalidation for all pages
    revalidatePath('/', 'page');
    revalidatePath('/stories');
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      message: 'Revalidated all pages' 
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 