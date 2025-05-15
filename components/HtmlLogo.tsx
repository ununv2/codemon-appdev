import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HtmlLogo = ({ fill = "white", ...props }: SvgProps) => (
  <Svg viewBox="0 0 24 24" height={40} width={40} {...props}>
    <Path d="M0 13.01v-2l7.09-2.98.58 1.94-5.1 2.05 5.16 2.05-.63 1.9Zm16.37 1.03 5.18-2-5.16-2.09.65-1.88L24 10.95v2.12L17 16zm-2.85-9.98H16l-5.47 15.88H8.05Z" fill={fill}/>
  </Svg>
)
export default HtmlLogo
