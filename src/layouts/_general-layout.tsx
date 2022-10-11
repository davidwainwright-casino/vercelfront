import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/layouts/_header';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import Copyright from '@/layouts/_copyright';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import { useRouter } from 'next/router';

const BottomNavigation = dynamic(() => import('@/layouts/_bottom-navigation'));

export default function GeneralLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const breakpoint = useBreakpoint();
  const router = useRouter();
  const isMounted = useIsMounted();
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      className="flex min-h-screen w-full flex-col bg-light-300 dark:bg-dark-100"
    >
      <Header showHamburger={false} />
      <motion.div
        variants={fadeInBottom()}
        className="flex flex-1 flex-col justify-between"
      >
        <main className="flex w-full flex-grow flex-col">
        <div className="sticky p-4 md:px-6 lg:px-8 lg:pt-6 top-0 z-20 -mx-4 -mt-2 mb-1 flex items-center bg-light-300 p-4 dark:bg-dark-100 sm:static sm:top-auto sm:z-0 sm:m-0 sm:mb-4 sm:bg-transparent sm:p-0 sm:dark:bg-transparent">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-1.5 font-medium text-dark/70 hover:text-dark dark:text-light/70 hover:dark:text-light lg:mb-6"
          >
            <LongArrowIcon className="h-4 w-4" />
            Back
          </button>
        </div>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {children}
          </AnimatePresence>
        </main>
        <Copyright className="px-4 py-7 text-center font-medium text-dark-700 md:py-10 lg:px-8" />
      </motion.div>
      {isMounted && breakpoint === 'xs' && <BottomNavigation />}
    </motion.div>
  );
}
