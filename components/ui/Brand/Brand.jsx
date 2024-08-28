import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/collegegenie.png"
        alt="CollegeGenie Logo"
        {...props}
        width={440}
        height={200}
        priority
    />
)
export default Brand