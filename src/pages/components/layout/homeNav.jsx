import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { parseCookies, destroyCookie } from 'nookies';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function HomeNav(context) {
    const cookies = parseCookies(context);
    const token = cookies.token;

    const [clientWindowHeight, setClientWindowHeight] = useState("");

    const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
    const [padding, setPadding] = useState(15);
    const [boxShadow, setBoxShadow] = useState(0);

    const [showModal, setShowModal] = useState(true);

    const [currentLocation, setCurrentLocation] = useState("");

    const router = useRouter()

    function toggleModal() {
        setShowModal(true)
    }

    // useEffect(() => {
    // }, [])

    function handleLogout() {
        // console.log('clicked logout')
        destroyCookie(null, 'token', { path: '/' })
        destroyCookie(null, 'username', { path: '/' })

        setShowModal(false)
        router.push('/login');
    }


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

    useEffect(() => {
        let backgroundTransparacyVar = clientWindowHeight / 600;

        if (backgroundTransparacyVar < 1) {
            let paddingVar = 15 - backgroundTransparacyVar * 20;
            let boxShadowVar = backgroundTransparacyVar * 0.1;
            setBackgroundTransparacy(backgroundTransparacyVar);
            setPadding(paddingVar);
            setBoxShadow(boxShadowVar);
        }
    }, [clientWindowHeight]);

    // different nav for different pages
    const currentUrl = router.asPath

    useEffect(() => {
        setCurrentLocation(document.location.toString());
    })


    // 9CADCE
    return (
        <>
            {currentLocation.endsWith("/") ? (
                <nav className="navbar h-[10vh] bg-[#8ca7dd] sticky top-0">
                    <div className="navbar-start">
                        <Link href='/resume' className="btn btn-ghost normal-case text-xl tracking-tighter font-extrabold text-neutral-50">ResumeAnalyzer</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li className="text-neutral-50"><Link href='/'>Home</Link></li>
                            <li className="text-neutral-50" tabIndex={0}>
                                <a>
                                    Services
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                </a>
                                {/* <ul className="p-2 bg-neutral-200">
                            <li className="text-neutral-50"><a>Business Automation</a></li>
                            <li className="text-neutral-50"><Link href='/resume'>Resume Analysis</Link></li>
                        </ul> */}
                            </li>
                            <li className="text-neutral-50"><a>About</a></li>
                        </ul>
                    </div>
                    <div className="navbar-end">

                        <ul className="menu menu-horizontal px-1">
                            {token ? (

                                <li tabIndex={0}>
                                    <div className="avatar">
                                        <FontAwesomeIcon className='text-3xl text-neutral-50' icon={faUser} />
                                    </div>
                                    <ul className="p-2 bg-neutral-200">
                                        <label htmlFor="my-modal-4" className="p-1 cursor-pointer" onClick={toggleModal}>logout</label>
                                    </ul>
                                </li>
                            ) : (
                                <Link href='/login' className="btn btn-accent text-neutral-50">
                                    Login/ Register
                                </Link>
                            )}
                        </ul>
                    </div>

                    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                    {showModal == true &&
                        <>
                            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                                <label className="modal-box relative flex flex-row justify-center items-center gap-5" htmlFor="">
                                    <h3 className="text-lg font-bold">Are you sure?</h3>
                                    <a className="mr-3 btn btn-primary" onClick={handleLogout}>Yes, Logout</a>
                                </label>
                            </label>
                        </>
                    }
                    {/* } */}
                </nav>
            )
                : (
                    <nav className="navbar h-[10vh] bg-[#fff] sticky top-0">
                        <div className="navbar-start">
                            <Link href='/resume' className="btn btn-ghost normal-case text-xl tracking-tighter font-extrabold text-neutral-900 drop-shadow-2xl">ResumeAnalyzer</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li className="text-neutral-900 drop-shadow-2xl"><Link href='/'>Home</Link></li>
                                <li className="text-neutral-900 drop-shadow-2xl" tabIndex={0}>
                                    <a>
                                        Services
                                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                                    </a>
                                    {/* <ul className="p-2 bg-neutral-200">
                            <li className="text-neutral-900 drop-shadow-2xl"><a>Business Automation</a></li>
                            <li className="text-neutral-900 drop-shadow-2xl"><Link href='/resume'>Resume Analysis</Link></li>
                        </ul> */}
                                </li>
                                <li className="text-neutral-900 drop-shadow-2xl"><a>About</a></li>
                            </ul>
                        </div>
                        <div className="navbar-end">

                            <ul className="menu menu-horizontal px-1">
                                {token ? (

                                    <li tabIndex={0}>
                                        <div className="avatar">
                                            <FontAwesomeIcon className='text-3xl text-neutral-900 drop-shadow-2xl' icon={faUser} />
                                        </div>
                                        <ul className="p-2 bg-neutral-200">
                                            <label htmlFor="my-modal-4" className="p-1 cursor-pointer" onClick={toggleModal}>logout</label>
                                        </ul>
                                    </li>
                                ) : (
                                    <Link href='/login' className="btn btn-accent text-neutral-900 drop-shadow-2xl">
                                        Login/ Register
                                    </Link>
                                )}
                            </ul>
                        </div>

                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        {showModal == true &&
                            <>
                                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                                    <label className="modal-box relative flex flex-row justify-center items-center gap-5" htmlFor="">
                                        <h3 className="text-lg font-bold">Are you sure?</h3>
                                        <a className="mr-3 btn btn-primary" onClick={handleLogout}>Yes, Logout</a>
                                    </label>
                                </label>
                            </>
                        }
                        {/* } */}
                    </nav>
                )}
        </>
    )
}
