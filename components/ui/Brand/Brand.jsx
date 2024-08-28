import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/collegegenie.png"
        alt="CollegeGenie Logo"
        {...props}
        width={330}
        height={150}
        priority
    />
)
export default Brand