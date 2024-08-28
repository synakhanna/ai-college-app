const SectionWrapper = ({ children, ...props }) => (
    <section {...props} className={`height-1vh ${props.className || ""}`}>
        {children}
    </section>
)

export default SectionWrapper