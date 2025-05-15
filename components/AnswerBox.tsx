import * as React from "react"
import Svg, { Rect, Text } from "react-native-svg"

interface AnswerBoxprops {
    answer: string;
    [key: string]: any;
}

const AnswerBox = ({ answer, props }: AnswerBoxprops) => (
    <Svg
        width={144}
        height={56}
        fill="none"
        {...props}
    >
        <Rect
            width={139}
            height={51}
            x={2.5}
            y={2.5}
            fill="#E5BC14"
            stroke="#422D0A"
            strokeWidth={5}
            rx={7.5}
        />
        <Text
            x="72"
            y="28"
            fill="white"
            fontSize="20px"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily='VT323'
        >
            {answer}
        </Text>
    </Svg>
)
export default AnswerBox
