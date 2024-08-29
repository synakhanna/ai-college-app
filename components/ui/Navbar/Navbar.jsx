import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NavHeader from '../NavHeader';
import NavLink from '../NavLink';

const Navbar = () => {
    const [state, setState] = useState(false);
    const menuBtnEl = useRef(null);

    const soNavigation = [
        { name: "Features", href: "#features" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQs", href: "#faqs" },
    ];

    const userNavigation = [
        { name: "Profile", href: "/profile" },
        { name: "College", href: "/college" },
        { name: "Counselor", href: "/counselor" },
        { name: "Billing", href: "/billing" },
    ];

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (menuBtnEl.current && !menuBtnEl.current.contains(target)) {
                setState(false);
            }
        };
    }, []);

    const smoothScrollTo = (targetElement) => {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 2000; // Duration in milliseconds
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    return (
        <header className="w-full">
            <nav className={`pb-5 md:text-lg md:static md:block bg-gray-900 w-full`}>
                <div className="custom-screen items-center md:flex max-w-7xl mx-auto w-full">
                    <NavHeader state={state} onClick={() => setState(!state)} />
                    <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} md:block`}>
                        {/* Regular menu */}
                        <SignedOut>
                        <ul className="hidden lg:flex flex-1 justify-center items-center mt-5 space-y-6 lg:space-x-6 xl:space-x-8 lg:space-y-0">
                            {soNavigation.map((item, idx) => (
                                <li key={idx} className="hover:text-gray-50 text-lg font-semibold text-white">
                                    <Link href={item.href} scroll={false} onClick={(e) => {
                                        e.preventDefault();
                                        smoothScrollTo(document.querySelector(item.href));
                                    }}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        </SignedOut>
                        <SignedIn>
                        <ul className="hidden lg:flex flex-1 justify-center items-center mt-5 space-y-6 lg:space-x-6 xl:space-x-8 lg:space-y-0">
                            {userNavigation.map((item, idx) => (
                                <li key={idx} className="hover:text-gray-50 text-lg font-semibold text-white">
                                    <Link href={item.href}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        </SignedIn>
                        <div className="hidden lg:flex items-center gap-x-4 pt-5">
                            <SignedOut>
                                <NavLink href="/sign-in" className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                    Sign In
                                </NavLink>
                                <NavLink href="/sign-up" className="flex items-center justify-center gap-x-1 text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                    Sign Up
                                </NavLink>
                            </SignedOut>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/"/>
                            </SignedIn> 
                        </div>
                        {/* Hamburger menu button */}
                        <button
                            ref={menuBtnEl}
                            className="lg:hidden ml-auto text-gray-300"
                            onClick={() => setState(!state)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Hamburger menu items */}
                <div className={`lg:hidden ${state ? 'block' : 'hidden'} mt-5 bg-gray-900`}>
                    <SignedOut>
                    <ul className="flex flex-col items-center space-y-6 text-white">
                        {soNavigation.map((item, idx) => (
                            <li key={idx} className="hover:text-gray-50 text-lg font-semibold">
                                <Link href={item.href} scroll={false} onClick={(e) => {
                                    e.preventDefault();
                                    smoothScrollTo(document.querySelector(item.href));
                                }}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </SignedOut>
                    <SignedIn>
                    <ul className="flex flex-col items-center space-y-6 text-white">
                        {userNavigation.map((item, idx) => (
                            <li key={idx} className="hover:text-gray-50 text-lg font-semibold">
                                <Link href={item.href}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    </SignedIn>
                    <div className="flex flex-col items-center space-y-4 mt-6">
                        <SignedOut>
                            <NavLink href="/sign-in" className="text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900">
                                Sign In
                            </NavLink>
                            <NavLink href="/sign-up" className="text-lg text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900">
                                Sign Up
                            </NavLink>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
