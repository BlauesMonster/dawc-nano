export interface MemberImage {
	content: string;
}

export interface Member {
	id: number;
	username: string;
	role: string;
	isOnline: boolean;
	lastChatDate: string | null;
	customAvatar?: {
		image: MemberImage;
	};
}
