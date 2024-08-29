import { useInView } from "framer-motion";
import { cloneElement, isValidElement, useRef } from "react";

const LayoutEffect = ({ children, className, isInviewState: { trueState = "", falseState = "" } }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

   
    if (isValidElement(children)) {
        return cloneElement(children, {
            ref,
            className: `${children.props.className || ""} ${className || ""} ${isInView ? trueState : falseState}`
        });
    } else {
        return (
            <div ref={ref} className={`${className || ""} ${isInView ? trueState : falseState}`}>
                {children}
            </div>
        );
    }
};

export default LayoutEffect;
