import { NextResponse } from 'next/server';
import history from '@/db/history.json';

export const dynamic = 'force-static';

export async function GET() {
    return NextResponse.json(history);
}
