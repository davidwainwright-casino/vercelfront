import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { NextPageWithLayout, Product } from '@/types';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/layouts/_layout';
import client from '@/data/client';
import { useState } from 'react';
import Image from '@/components/ui/image';
import ProductSocialShare from '@/components/product/product-social-share';
import GameSummary from '@/components/product/game-summary';
import GameIframePopup from '@/components/product/game-iframe-popup';
import ProductDetailsPaper from '@/components/product/product-details-paper';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import { staggerTransition } from '@/lib/framer-motion/stagger-transition';
import {
  fadeInBottom,
  fadeInBottomWithScaleX,
  fadeInBottomWithScaleY,
} from '@/lib/framer-motion/fade-in-bottom';
import placeholder from '@/assets/images/placeholders/product.svg';
import { useSetState } from 'react-use';
import { useMe } from '@/data/user';

type ParsedQueryParams = {
  productSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const { data } = await client.products.all();
  const paths = data.map((product) => ({
    params: { productSlug: product.slug },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

type PageProps = {
  product: Product;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params }) => {
  const { productSlug } = params!; //* we know it's required because of getStaticPaths
  try {
    const product = await client.products.get(productSlug);
    return {
      props: {
        product,
      },
      revalidate: 60, // In seconds
    };
  } catch (error) {
    //* if we get here, the product doesn't exist or something else went wrong
    return {
      notFound: true,
    };
  }
};

function refreshPage() {
  window.location.reload();
}

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  const {
    name,
    slug,
    image,
    real_url,
    description,
    created_at,
    updated_at,
    isOpen,
    tags,
    type,
  } = product;
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const router = useRouter();
  const { me } = useMe();

  return (
    <div className="relative">
      <div className="h-full min-h-screen p-4 md:px-6 lg:px-8 lg:pt-4">
        <div className="sticky top-0 z-20 -mx-4 -mt-2 flex items-center bg-light-300 p-4 dark:bg-dark-100 sm:static sm:top-auto sm:z-0 sm:m-0 sm:mb-4 sm:bg-transparent sm:p-0 sm:dark:bg-transparent">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-1.5 font-medium text-dark/70 hover:text-dark dark:text-light/70 hover:dark:text-light lg:mb-1"
          >
            <LongArrowIcon className="h-4 w-4" />
            Back
          </button>
        </div>
        <motion.div
          variants={staggerTransition()}
          className="grid gap-4 sm:grid-cols-2 lg:gap-6"
        >
        </motion.div>
        <motion.div
          variants={fadeInBottom()}
          className="justify-center py-2 lg:flex lg:flex-col lg:py-10"
        >
          
        <div className="relative lg:space-x-14 xl:space-x-20 3xl:space-x-28">
            <div className="mx-auto -mt-6 sm:-mt-2 md:-mt-4 max-w-[1050px]">
          <GameIframePopup game_id={slug} iframe_url={real_url + '?player=' + me.profile.casino.USD.player_id + '&currency=' + me.profile.casino.USD.currency} real_url={real_url + '?player=' + me.profile.casino.USD.player_id + '&currency=' + me.profile.casino.USD.currency} />
          </div>
          </div> 
          <ProductDetailsPaper product={product} className="lg:hidden" />
          <div className="lg:mx-auto lg:flex lg:space-x-14 xl:space-x-20 3xl:max-w-[1200px] 3xl:space-x-28">
            <div className="hidden lg:block 3xl:max-w-[600px]">
              <h1 className="text-base font-medium text-dark dark:text-light 3xl:text-lg">
                {name}
              </h1>
              <div className="pb-5 leading-[1.9em] dark:text-light-600">
                {description}
              </div>
            </div>
            <GameSummary
              tags={tags}
              created_at={created_at}
              updated_at={updated_at}
              layoutType={product.type}
              className="flex-shrink-0 pb-6 pt-2.5 lg:min-w-[350px] lg:max-w-[470px]"
            />
          </div>
          <ProductSocialShare
            productSlug={product.slug}
            className="border-t border-light-500 pt-5 dark:border-dark-400 md:pt-7 lg:hidden"
          />
        </motion.div>
      </div>
      <motion.div
        variants={fadeInBottomWithScaleY()}
        className="sticky bottom-0 right-0 hidden h-[100px] w-full border-t border-light-500 bg-light-100 px-8 py-5 dark:border-dark-400 dark:bg-dark-200 lg:flex 3xl:h-[120px]"
      >
        <ProductDetailsPaper product={product} />
      </motion.div>
    </div>
  );
};
ProductPage.authorization = true;
ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
