import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// create music table
// export async function GET(request: Request) {
//   try {
//     const result =
//       await sql`CREATE TABLE Music ( title varchar(255), artist varchar(255), style varchar(255), uri varchar(255) );`;
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// create pros table
// export async function GET(request: Request) {
//   try {
//     const result =
//       await sql`CREATE TABLE Pros ( firstname varchar(75) NOT NULL, lastname varchar(75), image varchar(50), current boolean, gender varchar(20) );`;
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// create celebs table
// export async function GET(request: Request) {
//   try {
//     const result =
//       await sql`CREATE TABLE Celebs ( firstname varchar(75) NOT NULL, lastname varchar(75), image varchar(50), gender varchar(20), season integer NOT NULL, placement integer );`;
//     return NextResponse.json({ result }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
