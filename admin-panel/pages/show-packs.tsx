import { MoonNftPackData } from "@aobeta/flow-lib/types/Nft";
import axios from "axios";
import { Box, Image, Paragraph } from "grommet";
import { FunctionComponent, useEffect, useState } from "react";

const ShowPacksPage : FunctionComponent = () => {
    const [packs, setPacks] = useState<MoonNftPackData[]>([]);

    useEffect(() => {
        axios.get('/api/nft/fetch/packs')
            .then(({ data }) => {
                setPacks(data)
            })
    }, []);

    useEffect(() => {
        console.log("packs ", packs);
    }, [packs]);

    return (
        <Box pad="xlarge" fill direction="row">
            {packs.map(pack => (
                <Box key={pack.id}>
                    <Image src={pack.previewMediaUrl} style={{ width: '200px'}}/>
                    <Paragraph>
                        {pack.description}
                    </Paragraph>
                </Box>
            ))}
        </Box>
    );
};

export default ShowPacksPage;
