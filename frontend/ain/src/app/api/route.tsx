export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const headers: Record<string, string | undefined> = {
    'Content-Type': 'application/json',
    'API-Key': apiKey,
  };
  const res = await fetch('https://data.mongodb-api.com/...', headers);
  const data = await res.json();

  return Response.json({ data });
}

export async function POST(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const headers: Record<string, string | undefined> = {
    'Content-Type': 'application/json',
    'API-Key': apiKey,
  };
  const res = await fetch('https://data.mongodb-api.com/...', headers);
  const data = await res.json();

  return Response.json({ data });
}

export async function PATCH(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const headers: Record<string, string | undefined> = {
    'Content-Type': 'application/json',
    'API-Key': apiKey,
  };
  const res = await fetch('https://data.mongodb-api.com/...', headers);
  const data = await res.json();

  return Response.json({ data });
}

export async function DELETE(request: Request) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const headers: Record<string, string | undefined> = {
    'Content-Type': 'application/json',
    'API-Key': apiKey,
  };
  const res = await fetch('https://data.mongodb-api.com/...', headers);
  const data = await res.json();

  return Response.json({ data });
}
