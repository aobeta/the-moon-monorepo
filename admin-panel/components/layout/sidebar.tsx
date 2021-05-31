import React, { FunctionComponent } from "react";
import { Sidebar as GrommetSideBar, Nav, Avatar, Anchor } from "grommet";
import Link from "next/link";

const SideBar : FunctionComponent = () => {

    const renderHeader = () => (
        <Avatar
            border={{ size: 'small', color: 'accent-2' }}
            background="white"
            flex={false}
        >
            SY
        </Avatar>
    )

    return (
        <GrommetSideBar
            background="accent-1"
            header={renderHeader()}
            justify = "center"
            style={{ minWidth: '140px'}}
        >
            <Nav gap="small">
                <Link href="/">
                    <Anchor href="/">Mint NFT</Anchor>
                </Link>
                <Link href="/showNfts">
                    <Anchor href="/">Minted NFT's</Anchor>
                </Link>
                <Link href="/create-pack">
                    <Anchor href="/">Create Pack</Anchor>
                </Link>
                <Link href="/show-packs">
                    <Anchor href="/">Packs Created</Anchor>
                </Link>
            </Nav>
        </GrommetSideBar>
    )
}

export default SideBar;
