// GET /api/members
export async function GET() {
	const res = await fetch('https://dara-animechat.de/api/users/slim');

	const data = await res.json();
	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
