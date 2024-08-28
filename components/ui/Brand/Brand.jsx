import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/logo.png"
        alt="CollegeGenie Logo"
        {...props}
        width={110}
        height={50}
        priority
    />
)
export default Brand