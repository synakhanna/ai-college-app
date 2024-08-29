import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'; 
import NavHeader from '../NavHeader';
import NavLink from '../NavLink';

const Navbar = () => {
    const [state, setState] = useState(false);
    const menuBtnEl = useRef(null);
    const router = useRouter();

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
        { name: "Network", href: "/network" },
        { name: "Billing", href: "/billing" },
    ];

    const smoothScrollTo = (targetElement) => {
        if (!targetElement) {
            console.warn("Target element not found.");
            return;
        }

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 2000;
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

    const handleNavClick = (e, itemHref) => {
        e.preventDefault();
        if (router.pathname !== "/") {
            router.push(`/${itemHref}`).then(() => {
                setTimeout(() => {
                    smoothScrollTo(document.querySelector(itemHref));
                }, 100);
            });
        } else {
            smoothScrollTo(document.querySelector(itemHref));
        }
    };

    const toggleMenu = () => {
        setState((prev) => !prev);
    };

    return (
        <header className="w-full">
            <nav className={`pb-5 md:text-lg md:static md:block bg-gray-900 w-full`}>
                <div className="custom-screen items-center md:flex max-w-7xl mx-auto w-full">
                    <NavHeader state={state} onClick={toggleMenu} />
                    <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} md:block`}>
                        <SignedOut>
                            <ul className="hidden lg:flex flex-1 justify-center items-center mt-5 space-y-6 lg:space-x-6 xl:space-x-8 lg:space-y-0">
                                {soNavigation.map((item, idx) => (
                                    <li key={idx} className="hover:text-gray-50 text-lg font-semibold text-white">
                                        <Link href={item.href} scroll={false} onClick={(e) => handleNavClick(e, item.href)}>
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
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn> 
                        </div>
                        <button
                            ref={menuBtnEl}
                            className="lg:hidden ml-auto text-gray-300"
                            onClick={toggleMenu}
                        >
                            
                        </button>
                    </div>
                </div>
                <div className={`lg:hidden ${state ? 'block' : 'hidden'} mt-5 bg-gray-900`}>
                    <SignedOut>
                        <ul className="flex flex-col items-center space-y-6 text-white">
                            {soNavigation.map((item, idx) => (
                                <li key={idx} className="hover:text-gray-50 text-lg font-semibold">
                                    <Link href={item.href} scroll={false} onClick={(e) => handleNavClick(e, item.href)}>
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
