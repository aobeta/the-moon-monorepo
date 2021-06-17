<CardContainer
round="10px"
width="medium"
pad="10px"
margin={{ horizontal: '40px' }}
>	
<Card round="2px" pad="10px">
    <CardBody>
        {mediaType === MediaType.Image && <Image fit="cover" src={fileSource} />}
        {/* {mediaType === MediaType.Video && (
<VideoElement videoFile={mediaFile} customWidth={350} />
)} */}
    </CardBody>
    <CardFooter pad="medium" direction="row" gap="xxsmall">
        <Box>
            <Header alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
                {title}
            </Header>
            <Text alignSelf="start" style={{ fontFamily: 'Moon Light', fontSize: '20px' }}>
                {numassets} Assets
            </Text>
        </Box>
        <FaveIcon color="red"/>
    </CardFooter>
</Card>
</CardContainer>