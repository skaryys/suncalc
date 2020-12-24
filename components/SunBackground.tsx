import { FC } from "react";
import * as React from "react";
import { Box, BoxProps } from "@xcorejs/ui";
import styled from "styled-components";

export type SunBackgroundProps = {
  light?: boolean;
} & BoxProps;

const SunBackgroundStyle = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(./bg_768.jpg);
  min-height: 48rem;
  transition: filter 600ms;
  
  @media (min-width: 769px) {
    background-image: url(./bg_1024.jpg);
  }
  
  @media (min-width: 1025px) {
    background-image: url(./bg_1920.jpg);
  }
  
  @media (min-width: 1921px) {
    background-image: url(./bg_2560.jpg);
  }
`;

const SunBackground: FC<SunBackgroundProps> = ({
  light,
  children,
  ...props
}) => {
  return (
    <SunBackgroundStyle filter={light ? "saturate(100%)" : "saturate(0%)"} {...props}>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundColor={"rgba(0,0,0,.65)"}
      />
    </SunBackgroundStyle>
  );
};

export default SunBackground;