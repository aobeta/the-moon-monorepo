import { FunctionComponent, memo } from "react";


const MoonLogoSvg : FunctionComponent = () => {
    return (
        <svg 
            width="64" 
            height="64" 
            viewBox="0 0 64 64" 
            fill="none" 
            dangerouslySetInnerHTML = {{__html: `
                <rect width="64" height="64" fill="url(#logo0)"/>
                <defs>
                <pattern id="logo0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#logoImage0" transform="translate(0 -0.000951475) scale(0.000951475)"/>
                </pattern>
                <image id="logoImage0" width="1051" height="1053" xlink:href="/moon_logo.png"/>
                </defs>
            `}}
        />
    )
}

export default memo(MoonLogoSvg);
