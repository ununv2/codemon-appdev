import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const Statbox = (props: SvgProps) => (
  <Svg
    width={334}
    height={222}
    fill="none"
    {...props}
  >
    <Path
      fill="#FACC14"
      d="M0 20C0 8.954 8.954 0 20 0h294c11.046 0 20 8.954 20 20v91H0V20Z"
    />
    <Path
      fill="#E5BC14"
      d="M0 111h334v91c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-91Z"
    />
  </Svg>
)
export default Statbox
