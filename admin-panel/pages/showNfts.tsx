import { Box } from "grommet";
import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import NFTCard from "../components/nft/nftCard";
import { MediaType } from "../types/media";
import { GroupNftData } from "../types/nft";



const showNfts : FunctionComponent = () => {
    const [allGroups, setAllGroups] = useState<GroupNftData[]>([]);
    useEffect(() => {
        axios.get('/api/nft/fetch/minted')
            .then(response => {
                console.log("Fetch Result :: ", response.data)
                setAllGroups(response.data as GroupNftData[]);
            });
    }, []);

    return (
        <Box pad="medium" fill>
            {allGroups.map(group => (
                <NFTCard
                    key={group.groupId}
                    mediaFile={group.metadata.mediaUrl}
                    title={group.metadata.metadata.title}
                    mediaType={MediaType.Image}
                />
            ))}
        </Box>
    )
};

export default showNfts;
