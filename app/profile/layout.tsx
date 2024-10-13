'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/User-navigation/sidebar'

import { useCollapsibleStore } from '@/lib/usecollapse'
import { useState } from 'react'
import { User,Wand,Loader2,Plus,Brush,GripVertical } from 'lucide-react';

export default function Dashboard({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const {isOpen, onOpen, onClose } = useCollapsibleStore()
	const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate an action or API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // You can replace this timeout with actual logic
  };
	return (
		<section className='relative z-2'>
			<Sidebar />
			<main
				className={cn(
					'flex flex-1 flex-col transition-[margin-left] duration-500 delay-0 ease-in-out ',
					isOpen ? 'lg:ml-[280px]' : 'lg:ml-0'
				)}
			>
			
				<header className='flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6 sticky top-0 z-[3]'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant='outline'
								size='icon'
								className='shrink-0 lg:hidden'
							>
								<GripVertical className='h-5 w-5' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='flex flex-col'>
							<nav className='grid gap-2 text-lg font-medium'>
								<Link href='/' className='flex items-center gap-3 mb-4'>
									<Image src='/logo.svg' alt='logo' width={170} height={100} />
								</Link>
								<Link
									href='admin/main'
									className={cn(
										'flex items-center gap-3 rounded-lg  px-1 py-2 text-muted-foreground transition-all hover:text-primary',
										pathname.includes('/spend-analysis') &&
											' text-primary bg-indigo-200'
									)}
								>
									< Brush className='h-4 w-4' />
									Spend Analysis
								</Link>
								<Link
									href='/dashboard/projects'
									className={cn(
										'flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary',
										pathname.includes('/projects') && 'bg-indigo-200 text-primary'
									)}
								>
									< Brush className='h-4 w-4' />
									All Projects
								</Link>
								<Link
									href='/dashboard/settings'
									className={cn(
										'flex items-center gap-3 rounded-lg px-1 py-2 text-muted-foreground transition-all hover:text-primary',
										pathname.includes('/settings') && 'bg-indigo-200 text-primary'
									)}
								>
									< Brush className='h-4 w-4' />
									Settings
								</Link>
							</nav>
							<div className='mt-auto'>
								<Card>
									<CardHeader>
										<CardTitle>Upgrade to Pro</CardTitle>
										<CardDescription>
											Unlock all features and get unlimited access to our
											support team.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Link href='/pricing' target='_blank'>
											<Button size='sm' className='w-full'>
												Upgrade
											</Button>
										</Link>
									</CardContent>
								</Card>
							</div>
						</SheetContent>
					</Sheet>
					<Button
						variant='outline'
						className={cn(
							'shrink-0 hidden transition-[transform_display]',
							isOpen ? 'scale-0 hidden' : 'lg:scale-100 lg:flex delay-500'
						)}
						onClick={() => {
							if (isOpen) {
								onClose()
							} else onOpen()
						}}
					>
						<Wand className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
					<div
						className={cn(
							'h-14 items-center border-b lg:h-[60px] hidden transition-[transform_display] ',
							isOpen ? 'scale-0 hidden' : 'lg:scale-100 lg:flex delay-500'
						)}
					>
					</div>
					<div className='flex items-center gap-4 sm:gap-8
					 md:gap-9 z-10'>
		<Link href="/profile/periodistas/new" className='block'>
		<Button disabled size='lg' className='bg-[#666]
		text-white' onClick={handleClick}>
		 {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> &nbsp; Loading...
          </>
        ) : (
          <>
            <User /> &nbsp; Registrate Periodista
          </>
        )}
		</Button>
		</Link>
		<Link href="/profile/responsables/new" className='block'>
		<Button disabled size='lg' className='bg-[#666]
		text-white' onClick={handleClick}>
		 {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> &nbsp; Loading...
          </>
        ) : (
          <>
            <User /> &nbsp; Registrate comunicador
          </>
        )}
		</Button>
		</Link>
		<Link href="/profile/crear" className='block'>
		<Button onClick={handleClick}>
		 {isLoading ? (
          <>
            <Loader2 className="animate-spin" /> &nbsp; Loading...
          </>
        ) : (
          <>
            <Plus /> &nbsp; Crear comunicado
          </>
        )}
		</Button>
		</Link>
		</div>
		</header>
		{children}
		</main>
		</section>
	)
}
