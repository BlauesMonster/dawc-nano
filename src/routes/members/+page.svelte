<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import type { Member } from '$lib/types';
	import { fetchMembers, fetchDefaultAvatar } from '$lib/members-service';

	const members = writable<Member[]>([]);
	const search = writable('');
	const nullAvatar = writable<string | null>(null);
	const loading = writable(true);

	// Load data when the page mounts
	onMount(async () => {
		try {
			const [memberList, avatar] = await Promise.all([
				fetchMembers(),
				fetchDefaultAvatar()
			]);
			members.set(memberList);
			console.log(avatar);
			nullAvatar.set(avatar);
		} catch (err) {
			console.error('Error loading data', err);
		} finally {
			loading.set(false);
		}
	});

	const filtered = derived([members, search], ([$members, $search]) =>
		$members.filter((m) =>
			m.username.toLowerCase().includes($search.toLowerCase())
		)
	);

	function formatDate(str: string) {
		return new Date(str).toLocaleString();
	}
</script>

<!-- Page Title -->
<div class="p-6 max-w-7xl mx-auto">
	<h1 class="text-3xl font-bold mb-2">Mitgliederübersicht</h1>
	<p class="mb-4 text-gray-600">Alle Mitglieder im System</p>

	<!-- Search -->
	<input
		type="text"
		class="input input-bordered w-full max-w-sm mb-6"
		placeholder="🔍 Suche nach Username..."
		on:input={(e) => search.set(e.target.value)}
	/>

	<!-- Loading Spinner -->
	{#if $loading}
		<div class="flex justify-center my-10">
			<span class="loading loading-ring loading-lg"></span>
		</div>
	{:else}

		<!-- Members Table -->
		<div class="overflow-x-auto shadow rounded-xl">
			<table class="table table-zebra w-full">
				<thead class="bg-base-200">
				<tr>
					<th>Id</th>
					<th>Avatar</th>
					<th>Username</th>
					<th>Rolle</th>
					<th>Status</th>
				</tr>
				</thead>
				<tbody>
				{#each $filtered as member}
					<tr>
						<td class="text-sm">{member.id}</td>
						<td>
							<div class="avatar">
								<div class="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
									<img
										src={member.customAvatar?.image?.content ?? $nullAvatar}
										alt={`Avatar von ${member.username}`}
										loading="lazy"
									/>
								</div>
							</div>
						</td>
						<td>{member.username}</td>
						<td>{member.role}</td>
						<td>
							{#if member.isOnline}
								<span>Online</span>
							{:else if member.lastChatDate}
								<span>Zuletzt: {formatDate(member.lastChatDate)}</span>
							{:else}
								<span>n/a</span>
							{/if}
						</td>
					</tr>
				{/each}
				{#if $filtered.length === 0}
					<tr>
						<td colspan="5" class="text-center text-gray-400 p-6">
							Keine Mitglieder mit den Suchkriterien gefunden.
						</td>
					</tr>
				{/if}
				</tbody>
			</table>
		</div>
	{/if}
</div>
