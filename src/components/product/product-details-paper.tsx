import type { Product } from '@/types';
import cn from 'classnames';
import routes from '@/config/routes';
import AnchorLink from '@/components/ui/links/anchor-link';
import { ShoppingCartIcon } from '@/components/icons/shopping-cart-icon';
import Image from '@/components/ui/image';
import { useModalAction } from '@/components/modal-views/context';
import { Tag } from '@/types';
import { LabelIcon } from '@/components/icons/label-icon';

import placeholder from '@/assets/images/placeholders/product.svg';

interface Props {
  product: Product;
  tags: Tag[];
  className?: string;
}

export default function ProductDetailsPaper({ product, className }: Props) {
  const { openModal } = useModalAction();

  const {
    id,
    name,
    slug,
    provider,
    tags,
    shop,
    image,
    price,
    sale_price,
  } = product;
  return (
    <div
      className={cn(
        'items-center justify-between lg:flex lg:w-full',
        className
      )}
    >
      <div className="lg:block lg:pr-5">
        <h2 className="text-base font-medium text-dark dark:text-light 3xl:text-xl">
          {name}
        </h2>
        <div className="items-center pt-1.5 lg:flex lg:space-x-6">
          <div className="flex items-center pb-4 lg:pb-0">
            <div className="relative flex h-7 w-7 flex-shrink-0">
              <Image
                alt={shop?.provider}
                layout="fill"
                quality={100}
                objectFit="cover"
                src={image ?? placeholder}
                className="rounded-full"
              />
            </div>
            <h2 className="pl-2 pb-1 font-medium dark:text-dark-base lg:text-dark lg:dark:text-light-400">
              <AnchorLink
                href={routes.shopUrl(provider.slug)}
                className="hover:text-brand"
              >
                {'by ' + provider.name ?? ''}
              </AnchorLink>
            </h2>
          </div>
          <div className="flex space-x-6 border-y border-light-500 py-3 dark:border-dark-400 sm:py-4 lg:border-0 lg:py-0">
            <div className="flex items-center tracking-[.1px] text-dark dark:text-light">
            {!!tags?.length && (
            <div className="flex items-start text-dark dark:text-light">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                  <AnchorLink
                    key={tag.id}
                    href={routes.tagUrl(tag.slug)}
                    className="inline-flex items-center justify-center rounded border border-light-600 px-2 py-0.5 font-medium text-light-base transition-all hover:bg-light-200 hover:text-dark-300 dark:border-dark-500 dark:text-light-600 dark:hover:bg-dark-400 hover:dark:text-light"
                  >
                    {tag.name}
                  </AnchorLink>
                ))}
              </div>
        </div>
      )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center py-3.5 xs:flex-row xs:gap-2.5 sm:py-4 md:gap-3.5 lg:w-[480px] lg:gap-4 lg:py-2 2xl:w-2/5 3xl:w-[480px]">
        <a
          onClick={() => openModal('PRODUCT_DETAILS', { slug })}
          rel="noreferrer"
          target="_blank"
          className="transition-fill-colors flex items-center justify-center gap-2 font-semibold duration-200 pointer-events-auto cursor-pointer opacity-100 min-h-[46px] sm:h-12 rounded py-3 px-4 md:px-5 bg-brand text-white hover:bg-brand-dark focus:bg-brand-dark !mt-5 w-full text-sm tracking-[0.2px] lg:!mt-7"
        >
          Play {name}
        </a>
      </div>
    </div>
  );
}
