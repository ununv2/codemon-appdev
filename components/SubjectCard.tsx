import * as React from "react"
import Svg, { SvgProps, Path, Text, G } from "react-native-svg"
import { ComponentType } from "react"


interface SubjectCardProps {
    name: string;
    Icon: ComponentType<SvgProps>;
    progress: number;
    [key: string]: any;
}
const SubjectCard = ({ name,Icon, progress, ...props }: SubjectCardProps) => (
    <Svg
        width={147}
        height={118}
        fill="none"
        {...props}
    >
        <Path
            fill="#422D0A"
            d="M0 10C0 4.477 4.477 0 10 0h127c5.523 0 10 4.477 10 10v98c0 5.523-4.477 10-10 10H10c-5.523 0-10-4.477-10-10V10Z"
        />
        <Path fill="#C28827" d="M3 10a7 7 0 0 1 7-7h127a7 7 0 0 1 7 7v73H3V10Z" />
        <G x="53.5" y="15"><Icon /></G>
        <Text
            x="73.5"
            y="70"
            fill="white"
            fontSize="13px"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily='PressStart2P'
        >
            {name}
        </Text>
        <Path fill="#FACC14" d="M3 83h141v25a7 7 0 0 1-7 7H10a7 7 0 0 1-7-7V83Z" />
        <Text
            x="70"
            y="100"
            fill="black"
            fontSize="23px"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontFamily='VT323'
        >
            {`Progress: ${progress}%`}
        </Text>
    </Svg>
)

export default SubjectCard
