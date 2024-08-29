import { useInView } from "framer-motion";
import { cloneElement, useRef, isValidElement } from "react";

const LayoutEffect = ({ children, className, isInviewState: { trueState = "", falseState = "" } }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Check if children is a valid React element
    if (isValidElement(children)) {
        return cloneElement(children, {
            ref,
            className: `${children.props.className || ""} ${className || ""} ${isInView ? trueState : falseState}`
        });
    } else {
        // Wrap children in a div if it's not a valid React element
        return (
            <div ref={ref} className={`${className || ""} ${isInView ? trueState : falseState}`}>
                {children}
            </div>
        );
    }
};

export default LayoutEffect;
