import * as React from "react"
import Svg, { Mask, Path, SvgProps } from "react-native-svg"
const Stats = (props: SvgProps) => (
  <Svg
    width={125}
    height={29}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={125}
      height={29}
      x={0}
      y={0}
      fill="#000"
      maskUnits="userSpaceOnUse"
    >
      <Path fill="#fff" d="M0 0h125v29H0z" />
      <Path d="M7 25v-3H4v-3h6v3h9v-6H7v-3H4V7h3V4h15v3h3v3h-6V7h-9v6h12v3h3v6h-3v3H7Zm30 0V7h-6V4h18v3h-6v18h-6Zm15 0V10h3V7h3V4h9v3h3v3h3v15h-6v-6h-9v6h-6Zm6-9h9v-6h-3V7h-3v3h-3v6Zm27 9V7h-6V4h18v3h-6v18h-6Zm18 0v-3h-3v-3h6v3h9v-6h-12v-3h-3V7h3V4h15v3h3v3h-6V7h-9v6h12v3h3v6h-3v3h-15Z" />
    </Mask>
    <Path
      fill="#FACC14"
      d="M7 25v-3H4v-3h6v3h9v-6H7v-3H4V7h3V4h15v3h3v3h-6V7h-9v6h12v3h3v6h-3v3H7Zm30 0V7h-6V4h18v3h-6v18h-6Zm15 0V10h3V7h3V4h9v3h3v3h3v15h-6v-6h-9v6h-6Zm6-9h9v-6h-3V7h-3v3h-3v6Zm27 9V7h-6V4h18v3h-6v18h-6Zm18 0v-3h-3v-3h6v3h9v-6h-12v-3h-3V7h3V4h15v3h3v3h-6V7h-9v6h12v3h3v6h-3v3h-15Z"
    />
    <Path
      fill="#000"
      d="M7 25H3v4h4v-4Zm0-3h4v-4H7v4Zm-3 0H0v4h4v-4Zm0-3v-4H0v4h4Zm6 0h4v-4h-4v4Zm0 3H6v4h4v-4Zm9 0v4h4v-4h-4Zm0-6h4v-4h-4v4ZM7 16H3v4h4v-4Zm0-3h4V9H7v4Zm-3 0H0v4h4v-4Zm0-6V3H0v4h4Zm3 0v4h4V7H7Zm0-3V0H3v4h4Zm15 0h4V0h-4v4Zm0 3h-4v4h4V7Zm3 0h4V3h-4v4Zm0 3v4h4v-4h-4Zm-6 0h-4v4h4v-4Zm0-3h4V3h-4v4Zm-9 0V3H6v4h4Zm0 6H6v4h4v-4Zm12 0h4V9h-4v4Zm0 3h-4v4h4v-4Zm3 0h4v-4h-4v4Zm0 6v4h4v-4h-4Zm-3 0v-4h-4v4h4Zm0 3v4h4v-4h-4ZM7 25h4v-3H3v3h4Zm0-3v-4H4v8h3v-4Zm-3 0h4v-3H0v3h4Zm0-3v4h6v-8H4v4Zm6 0H6v3h8v-3h-4Zm0 3v4h9v-8h-9v4Zm9 0h4v-6h-8v6h4Zm0-6v-4H7v8h12v-4ZM7 16h4v-3H3v3h4Zm0-3V9H4v8h3v-4Zm-3 0h4V7H0v6h4Zm0-6v4h3V3H4v4Zm3 0h4V4H3v3h4Zm0-3v4h15V0H7v4Zm15 0h-4v3h8V4h-4Zm0 3v4h3V3h-3v4Zm3 0h-4v3h8V7h-4Zm0 3V6h-6v8h6v-4Zm-6 0h4V7h-8v3h4Zm0-3V3h-9v8h9V7Zm-9 0H6v6h8V7h-4Zm0 6v4h12V9H10v4Zm12 0h-4v3h8v-3h-4Zm0 3v4h3v-8h-3v4Zm3 0h-4v6h8v-6h-4Zm0 6v-4h-3v8h3v-4Zm-3 0h-4v3h8v-3h-4Zm0 3v-4H7v8h15v-4Zm15 0h-4v4h4v-4Zm0-18h4V3h-4v4Zm-6 0h-4v4h4V7Zm0-3V0h-4v4h4Zm18 0h4V0h-4v4Zm0 3v4h4V7h-4Zm-6 0V3h-4v4h4Zm0 18v4h4v-4h-4Zm-6 0h4V7h-8v18h4Zm0-18V3h-6v8h6V7Zm-6 0h4V4h-8v3h4Zm0-3v4h18V0H31v4Zm18 0h-4v3h8V4h-4Zm0 3V3h-6v8h6V7Zm-6 0h-4v18h8V7h-4Zm0 18v-4h-6v8h6v-4Zm9 0h-4v4h4v-4Zm0-15V6h-4v4h4Zm3 0v4h4v-4h-4Zm0-3V3h-4v4h4Zm3 0v4h4V7h-4Zm0-3V0h-4v4h4Zm9 0h4V0h-4v4Zm0 3h-4v4h4V7Zm3 0h4V3h-4v4Zm0 3h-4v4h4v-4Zm3 0h4V6h-4v4Zm0 15v4h4v-4h-4Zm-6 0h-4v4h4v-4Zm0-6h4v-4h-4v4Zm-9 0v-4h-4v4h4Zm0 6v4h4v-4h-4Zm0-9h-4v4h4v-4Zm9 0v4h4v-4h-4Zm0-6h4V6h-4v4Zm-3 0h-4v4h4v-4Zm0-3h4V3h-4v4Zm-3 0V3h-4v4h4Zm0 3v4h4v-4h-4Zm-3 0V6h-4v4h4Zm-6 15h4V10h-8v15h4Zm0-15v4h3V6h-3v4Zm3 0h4V7h-8v3h4Zm0-3v4h3V3h-3v4Zm3 0h4V4h-8v3h4Zm0-3v4h9V0h-9v4Zm9 0h-4v3h8V4h-4Zm0 3v4h3V3h-3v4Zm3 0h-4v3h8V7h-4Zm0 3v4h3V6h-3v4Zm3 0h-4v15h8V10h-4Zm0 15v-4h-6v8h6v-4Zm-6 0h4v-6h-8v6h4Zm0-6v-4h-9v8h9v-4Zm-9 0h-4v6h8v-6h-4Zm0 6v-4h-6v8h6v-4Zm0-9v4h9v-8h-9v4Zm9 0h4v-6h-8v6h4Zm0-6V6h-3v8h3v-4Zm-3 0h4V7h-8v3h4Zm0-3V3h-3v8h3V7Zm-3 0h-4v3h8V7h-4Zm0 3V6h-3v8h3v-4Zm-3 0h-4v6h8v-6h-4Zm27 15h-4v4h4v-4Zm0-18h4V3h-4v4Zm-6 0h-4v4h4V7Zm0-3V0h-4v4h4Zm18 0h4V0h-4v4Zm0 3v4h4V7h-4Zm-6 0V3h-4v4h4Zm0 18v4h4v-4h-4Zm-6 0h4V7h-8v18h4Zm0-18V3h-6v8h6V7Zm-6 0h4V4h-8v3h4Zm0-3v4h18V0H79v4Zm18 0h-4v3h8V4h-4Zm0 3V3h-6v8h6V7Zm-6 0h-4v18h8V7h-4Zm0 18v-4h-6v8h6v-4Zm12 0h-4v4h4v-4Zm0-3h4v-4h-4v4Zm-3 0h-4v4h4v-4Zm0-3v-4h-4v4h4Zm6 0h4v-4h-4v4Zm0 3h-4v4h4v-4Zm9 0v4h4v-4h-4Zm0-6h4v-4h-4v4Zm-12 0h-4v4h4v-4Zm0-3h4V9h-4v4Zm-3 0h-4v4h4v-4Zm0-6V3h-4v4h4Zm3 0v4h4V7h-4Zm0-3V0h-4v4h4Zm15 0h4V0h-4v4Zm0 3h-4v4h4V7Zm3 0h4V3h-4v4Zm0 3v4h4v-4h-4Zm-6 0h-4v4h4v-4Zm0-3h4V3h-4v4Zm-9 0V3h-4v4h4Zm0 6h-4v4h4v-4Zm12 0h4V9h-4v4Zm0 3h-4v4h4v-4Zm3 0h4v-4h-4v4Zm0 6v4h4v-4h-4Zm-3 0v-4h-4v4h4Zm0 3v4h4v-4h-4Zm-15 0h4v-3h-8v3h4Zm0-3v-4h-3v8h3v-4Zm-3 0h4v-3h-8v3h4Zm0-3v4h6v-8h-6v4Zm6 0h-4v3h8v-3h-4Zm0 3v4h9v-8h-9v4Zm9 0h4v-6h-8v6h4Zm0-6v-4h-12v8h12v-4Zm-12 0h4v-3h-8v3h4Zm0-3V9h-3v8h3v-4Zm-3 0h4V7h-8v6h4Zm0-6v4h3V3h-3v4Zm3 0h4V4h-8v3h4Zm0-3v4h15V0h-15v4Zm15 0h-4v3h8V4h-4Zm0 3v4h3V3h-3v4Zm3 0h-4v3h8V7h-4Zm0 3V6h-6v8h6v-4Zm-6 0h4V7h-8v3h4Zm0-3V3h-9v8h9V7Zm-9 0h-4v6h8V7h-4Zm0 6v4h12V9h-12v4Zm12 0h-4v3h8v-3h-4Zm0 3v4h3v-8h-3v4Zm3 0h-4v6h8v-6h-4Zm0 6v-4h-3v8h3v-4Zm-3 0h-4v3h8v-3h-4Zm0 3v-4h-15v8h15v-4Z"
      mask="url(#a)"
    />
  </Svg>
)
export default Stats
