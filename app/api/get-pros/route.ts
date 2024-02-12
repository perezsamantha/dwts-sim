import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// get pros
export async function GET(request: Request) {
  const pros = await sql`SELECT * FROM Pros;`;
  return NextResponse.json(pros.rows, { status: 200 });
}

// add pros
// export async function GET(request: Request) {
//   try {
//     await sql`INSERT INTO Pros (firstname, lastname, image, current, gender) VALUES();
//         `;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const pros = await sql`SELECT * FROM Pros;`;
//   return NextResponse.json({ pros }, { status: 200 });
// }
