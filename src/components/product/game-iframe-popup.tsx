import Image from '@/components/ui/image';
import { useRef, useState } from 'react';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import placeholder from '@/assets/images/placeholders/product.svg';
import Script from 'next/script'

interface Props {
  iframe_url: string;
  real_url: string;
  className?: string;
}

export default function GameIframePopup({
  className = 'w-full',
  game_id,
  iframe_url,
  real_url,
}: Props) {
  return (
    <div className={className}>
      <div className="xl:ms-5 relative mb-3 w-full overflow-hidden xl:mb-5">
            <div
              className="flex aspect-[16/9] w-full items-center justify-center bg-light-200 dark:bg-dark-200"
            >
              <iframe
                src={iframe_url}
                className="embed-responsive-item absolute top-0 right-0 bottom-0 z-1 bg-light-200 left-0 w-full h-full"
                scrolling="no"
                loading="lazy"
                referrerPolicy="no-referrer"
                srcDoc=''
                id={game_id + '--iframe'}
                allowFullScreen=""
              ></iframe>
            <Script defer="" id={game_id + '--script'} type="text/javascript">
            /*
                Code below is needed to load the real game content, it should auto-delete after loading the real_url.

                Probably you will want to insert this code AFTER you re-confirm that javascript is loading properly to prevent switching off javascript when loading game.

                You can also use dangerouslyInnerHTML in next.js most likely.

            */
            document.getElementById('{game_id + '--iframe'}').contentWindow.document.write("\x3Cscript crossorigin='anonymous'>location.replace('{real_url}')\x3C/script>");
            document.getElementById('{game_id + '--script'}').remove();
            </Script>
            </div>
        </div>
      </div>
  );
}
