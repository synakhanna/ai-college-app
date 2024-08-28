import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NavHeader from '../NavHeader';
import NavLink from '../NavLink';
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs"

const Navbar = () => {
    const [state, setState] = useState(false);
    const menuBtnEl = useRef(null);

    const navigation = [
        { name: "Features", href: "/#features" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Pricing", href: "/#pricing" },
        { name: "FAQs", href: "/#faqs" },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (menuBtnEl.current && !menuBtnEl.current.contains(target)) {
                setState(false);
            }
        };
    }, []);

    const handleSmoothScroll = (e, href) => {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const speed = 0.9;
            const duration = Math.abs(distance) / speed;

            let start = null;

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeInOutQuad = progress < 0.5 
                    ? 2 * progress * progress 
                    : -1 + (4 - 2 * progress) * progress;
                const run = startPosition + distance * easeInOutQuad;
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
            setState(false);
        }
    };

    return (
        <header>
        <nav className={`pb-5 md:text-lg md:static md:block ${state ? "bg-gray-900 absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-gray-900" : "hidden"}`}>
            <div className="custom-screen items-center md:flex">
                <NavHeader state={state} onClick={() => setState(!state)} />
                <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-8 md:space-y-0">
                        {navigation.map((item, idx) => (
                            <li key={idx} className="hover:text-gray-50 text-lg font-semibold">
                                <Link href={item.href} onClick={(e) => handleSmoothScroll(e, item.href)}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <SignedOut>
                            <NavLink href="/sign-in" className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                Sign In
                            </NavLink>
                            <NavLink href="/sign-up" className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                Sign Up
                            </NavLink>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    );
};

export default Navbar;
