import Image from '@/components/ui/image';
import routes from '@/config/routes';
import { useModalState } from '@/components/modal-views/context';
import AnchorLink from '@/components/ui/links/anchor-link';
import ProductSocialShare from '@/components/product/product-social-share';
import GameSummary from '@/components/product/game-summary';
import GameSessionDetails from '@/components/product/game-session-details';
import GameIframePopup from '@/components/product/game-iframe-popup';
import GameIframeLoaderScript from '@/components/product/game-iframe-loader-script';
import placeholder from '@/assets/images/placeholders/product.svg';
import pluralize from 'pluralize';
import { useProduct } from '@/data/product';
import ProductPopupLoader from '@/components/product/product-popup-loader';

export default function ProductPopupDetails() {
  const { data } = useModalState();
  const { product, isLoading } = useProduct(data.slug);
  if (!product && isLoading) return <ProductPopupLoader />;
  if (!product) return <div>Not found</div>;
  const {
    id,
    name,
    description,
    slug,
    image,
    provider,
    player_id,
    updated_at,
    created_at,
    tags,
    fake_iframe_url,
    real_url,
    play_real,
    type,
  } = product ?? {};
  return (
    <div className="flex max-w-full flex-col bg-light text-left dark:bg-dark-250 xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1300px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center bg-light-300 py-3 pl-4 pr-16 dark:bg-dark-100 md:py-4 md:pl-6 lg:-mx-4 lg:py-5 xl:pl-8">
        <h2
          title={name}
          className="truncate px-2.5 py-1 text-base font-medium text-dark dark:text-light md:text-lg lg:pl-4 lg:pr-5 3xl:text-xl"
        >
          <AnchorLink
            href={routes.productUrl(slug)}
            className="transition-colors hover:text-brand"
          >
            {name}
          </AnchorLink>
        </h2>
        <div className="flex flex-shrink-0 items-center px-2.5 py-1">
          <h3
            title={name}
            className="pl-2 text-13px font-medium text-dark-600 dark:text-light-800 md:pl-2.5"
          >
            <AnchorLink
              href={routes.shopUrl(provider?.slug)}
              className="hover:text-accent transition-colors"
            >
              {provider?.name}
            </AnchorLink>
          </h3>
        </div>
      </div>
      <div className="flex flex-col p-4 md:p-6 2xl:flex-row lg:space-x-7 xl:space-x-8 xl:p-8 3xl:space-x-10">
        <div className="mb-4 w-full items-center justify-center overflow-hidden md:mb-6 lg:mb-auto xl:flex 2xl:min-w-[895px]">
            <GameIframePopup game_id={slug} iframe_url={fake_iframe_url} real_url={real_url} />
        </div>
        <div className="flex shrink-0 flex-col justify-between text-13px lg:w-[300px] xl:w-[320px] 3xl:w-[455px]">
          <div className="pb-7 xs:pb-8 lg:pb-10">
            <div className="pb-5 leading-[1.9em] dark:text-light-600 xl:pb-6 3xl:pb-8">
              {description}
            </div>
            <GameSessionDetails
              tags={tags}
              created_at={created_at}
              player_id={player_id}
              layoutType={type ?? 'slots'}
              className="border-t border-light-500 py-5 dark:border-dark-500 lg:py-6 3xl:py-10"
            />
            <GameSummary
              tags={tags}
              created_at={created_at}
              updated_at={updated_at}
              layoutType={type ?? 'slots'}
              className="border-t border-light-500 py-5 dark:border-dark-500 lg:py-6 3xl:py-10"
            />
            <div className="border-t border-light-500 pt-5 dark:border-dark-500">
              <ProductSocialShare productSlug={slug} />
            </div>
          </div>
          <div className="flex flex-col-reverse items-center xs:flex-row xs:gap-2.5 xs:pb-4 md:flex-nowrap md:gap-3.5 lg:gap-4 3xl:pb-14">
            {Boolean(play_real) && (
              <a
                href={play_real}
                rel="noreferrer"
                target="_blank"
                className="transition-fill-colors flex min-h-[46px] w-full flex-1 items-center justify-center gap-2 rounded border border-light-500 bg-transparent py-3 px-4 font-semibold text-dark duration-200 hover:bg-light-400 hover:text-brand focus:bg-light-500 dark:border-dark-600 dark:text-light dark:hover:bg-dark-600 dark:focus:bg-dark-600 sm:h-12 md:px-5"
              >
                Play Direct
                <small class="hidden sm:md">without fake iframe url</small>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
