import axios from "axios"

export const uploadFileToIPFS = async (file: File) : Promise<string> => {
    const formdata = new FormData();
    formdata.append('file', file);

    const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;

    const { data } = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS',formdata,{
        headers: {
            'Authorization' : `Bearer ${jwt}`,
            'Content-Type' : 'multipart/form-data'
        },
    })

    return data.IpfsHash as string;
}
