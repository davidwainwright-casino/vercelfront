import type { Product } from '@/types';
import Router from 'next/router';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useModalAction } from '@/components/modal-views/context';
import routes from '@/config/routes';
import { PreviewIcon } from '@/components/icons/preview-icon';
import { DetailsIcon } from '@/components/icons/details-icon';
import placeholder from '@/assets/images/placeholders/product.svg';
import { useGridSwitcher } from '@/components/product/grid-switcher';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';

export default function Card({ product }: { product: Product }) {
  const { name, slug, image, shop } = product ?? {};
  const { openModal } = useModalAction();
  const { isGridCompact } = useGridSwitcher();
  const goToDetailsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Router.replace(routes.productUrl(slug));
  };
  return (
    <motion.div variants={fadeInBottomWithScaleX()} title={name}>
      <div className="group relative max-h-42 flex aspect-[15/8] w-full justify-center overflow-hidden">
        <Image
          alt={name}
          layout="fill"
          quality={99}
          objectFit="cover"
          src={product.img ?? placeholder}
          className="bg-light-500 dark:bg-dark-400 rounded-xl"
        />
        <div
        onClick={goToDetailsPage}
        className="absolute top-0 left-0 z-10 flex h-full w-full rounded-xl cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100 dark:bg-dark/70"
            >
          <button
            className={cn(
              'text-center font-medium text-light',
              isGridCompact ? 'text-xs' : 'text-13px'
            )}
          >
            <div
              className={cn(
                'mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand',
                isGridCompact ? 'h-11 w-11' : 'h-[50px] w-[50px]'
              )}
            >
              <PreviewIcon
                className={cn(isGridCompact ? 'h-4 w-4' : 'h-5 w-5')}
              />
            </div>
            Play
          </button>
          <button
            onClick={goToDetailsPage}
            className={cn(
              'relative z-[11] text-center font-medium text-light',
              isGridCompact ? 'text-xs' : 'text-13px'
            )}
          >
            <div
              className={cn(
                'mb-2 flex items-center justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand',
                isGridCompact ? 'h-11 w-11' : 'h-[50px] w-[50px]'
              )}
            >
              <DetailsIcon
                className={cn(isGridCompact ? 'h-4 w-4' : 'h-5 w-5')}
              />
            </div>
            Details
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between pt-2">
        <div className="relative flex h-7 w-7 mt-1 flex-shrink-0 4xl:h-9 4xl:w-9">
          <Image
            alt={shop?.name}
            layout="fill"
            quality={100}
            objectFit="contain"
            src={'https://wainwrighted.herokuapp.com/https://cdn2.softswiss.net/logos/providers_small/color/' + product.provider + '.svg' ?? placeholder}
            className="rounded-full bg-dark-500 dark:bg-dark-200"
          />
        </div>
        <div className="-mt-[1px] mr-auto flex flex-col truncate pl-2.5">
          <h3
            title={name}
            className="mb-0.5 truncate font-medium text-dark-100 dark:text-light"
          >
            <AnchorLink target="_blank" href={routes.productUrl(slug)}>{name}</AnchorLink>
          </h3>
          <AnchorLink
            href={routes.shopUrl(shop?.slug)}
            className="font-medium text-light-base hover:text-brand dark:text-dark-800 dark:hover:text-brand"
          >
            {product.provider}
          </AnchorLink>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end mt-1.5 pl-2">
          <span className="rounded-xl bg-light-500 px-3 py-1.5 text-10px font-medium text-brand dark:bg-dark-300 dark:text-brand-dark">
            {product.tags}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
