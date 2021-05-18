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
        >
            <Nav gap="small">
                <Link href="/">
                    <Anchor href="/">Mint NFT</Anchor>
                </Link>
                <Link href="/showNfts">
                    <Anchor href="/">Minted NFT's</Anchor>
                </Link>
            </Nav>
        </GrommetSideBar>
    )
}

export default SideBar;
