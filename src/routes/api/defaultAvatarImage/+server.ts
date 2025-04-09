// GET /api/members
export async function GET() {
	const res = await fetch('https://dara-animechat.de/api/stored-environment-variables/key/DefaultAvatarImage');

	const data = await res.json();

	const defaultAvatarImageId = data.value;
	const res2 = await fetch(`https://dara-animechat.de/api/images/${defaultAvatarImageId}`);
	const data2 = await res2.json();
	return new Response(JSON.stringify(data2.content), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
