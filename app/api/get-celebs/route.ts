import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// get celebs
export async function GET(request: Request) {
  const celebs = await sql`SELECT * FROM Celebs;`;
  return NextResponse.json(celebs.rows, { status: 200 });
}

// add celebs
// export async function GET(request: Request) {
//   try {
//     await sql`INSERT INTO Celebs (firstname, lastname, image, gender, season, placement) VALUES()
//         `;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const celebs = await sql`SELECT * FROM Celebs;`;
//   return NextResponse.json({ celebs }, { status: 200 });
// }
