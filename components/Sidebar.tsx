'use client'

import Link from 'next/link';
import Image from 'next/image'
import React from 'react';
import { sidebarLinks } from '@/contansts';
// import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href="/" className='mb-12 cursor-pointer item-center gap-2'>
                    <Image src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt="Horizon logo"
                    className="size-[24px] mx-xl:size-14" />
                    <h1 className='sidebar-logo'>Horizon</h1>
                </Link>
                {sidebarLinks.map((item) => {
                    // const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return (
                        <Link href={item.route}
                            key={item.label}
                            className={'sidebar-link bg-bank-gradient'}
                        >
                            <div className='relative size-6'>
                                <Image src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={
                                        'brightness-[3] invert-0' 
                                    }
                                />
                            </div>
                            <p className={
                                'sidebar-label isActive'
                            }>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}

            </nav> 
        </section>
    );
};

export default Sidebar;