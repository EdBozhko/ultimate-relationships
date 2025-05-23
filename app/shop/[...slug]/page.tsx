// nextjs.org/docs/app/api-reference/functions/generate-static-params

import { ListWithPopup } from '@comp/dom/ListWithPopup';
import { Container } from '@comp/dom/ListWithPopup/ListWithPopup.styles.ts';
import { Heading } from '@comp/dom/pages/ShopSlider/ShopSlider.styles.ts';
import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';

import type { ShopNavigationItem } from '@src/components/dom/pages/ShopSlider/ShopSlider.types';

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json());

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

import { ShopSlider } from '@comp/dom/pages/ShopSlider';

function getValueByPath(
  object: { [x: string]: ShopNavigationItem },
  pathArray: string[],
): ShopNavigationItem | undefined {
  let current: ShopNavigationItem | undefined = object[pathArray[0]];
  for (let i = 1; i < pathArray.length && current; i++) {
    if (current.subpages) {
      current = current.subpages[pathArray[i]];
    } else {
      return undefined;
    }
  }
  return current;
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  const shopNavigationList = getValueByPath(shopNavigation, slug);
  const heading = slug[slug.length - 1];

  return (
    <>
      {shopNavigationList && shopNavigationList.subpages && (
        <ShopSlider heading={heading} shopNavigation={Object.values(shopNavigationList.subpages)} />
      )}
      {shopNavigationList && 'products' in shopNavigationList && (
        <Container>
          <Heading>{heading}</Heading>
          <ListWithPopup list={shopNavigationList.products} />
        </Container>
      )}
    </>
  );
}
