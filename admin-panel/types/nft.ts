export interface GroupNftData {
    groupId: string;
    metadata: {
        originalContentCreator: string;
        creatorProfile: string;
        mediaUrl: string,
        metadata: Record<string,string> & { title : string, description: string }
    },
    nftIds: number[]
}
