import * as React from "react"
import Svg, { Rect, Text } from "react-native-svg"

interface QuestionBoxProps {
    question:string;
    [key: string]: any;
}
const QuestionBox = ({question, props}: QuestionBoxProps) => (
    <Svg
        width={327}
        height={130}
        fill="none"
        {...props}
    >
        <Rect
            width={322}
            height={125}
            x={2.5}
            y={2.5}
            fill="#C28827"
            stroke="#422D0A"
            strokeWidth={5}
            rx={7.5}
        />
        <Text
            x="163.5"
            y="65"
            fill="white"
            fontSize="20px"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily='VT323'
        >
            {question}
        </Text>
    </Svg>
)
export default QuestionBox
