import type { Member } from './types';

export async function fetchMembers(): Promise<Member[]> {
	const res = await fetch('/demo/api/members');

	if (!res.ok) throw new Error('Failed to fetch members');
	return await res.json();
}

export async function fetchDefaultAvatar(): Promise<string> {
	const res = await fetch('/demo/api/defaultAvatarImage');
	return await res.json();
}
