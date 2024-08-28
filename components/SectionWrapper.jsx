const SectionWrapper = ({ children, ...props }) => (
    <section {...props} className={`min-h-screen ${props.className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;
