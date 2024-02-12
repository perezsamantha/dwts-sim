import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// get music
export async function GET(request: Request) {
  const music = await sql`SELECT * FROM Music;`;
  return NextResponse.json(music.rows, { status: 200 });
}

// add music
// export async function GET(request: Request) {
//     try {
//       await sql`INSERT INTO Music (title, artist, style, uri) VALUES
//         ();
//         `;
//     } catch (error) {
//       return NextResponse.json({ error }, { status: 500 });
//     }

//   const music = await sql`SELECT * FROM Music;`;
//   return NextResponse.json({ music }, { status: 200 });
// }
