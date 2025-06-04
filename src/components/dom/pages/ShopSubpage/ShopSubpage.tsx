import { ListWithPopup } from '@comp/dom/ListWithPopup';
import { Container } from '@comp/dom/ListWithPopup/ListWithPopup.styles.ts';
import { PageHeading } from '@src/components/dom/PageHeading/';
import { shopNavigation } from '@src/helpers/lib/shopProducts.ts';
import { ShopSlider } from '@src/components/dom/ShopSlider';

import type { ShopSubpageComponent } from './ShopSubpage.types.ts';
import type { ShopNavigationItem } from '@src/components/dom/ShopSlider/ShopSlider.types';
import { MODELS_PAGES, PAGES } from '@src/utils/constants.ts';

const getValueByPath = (
  object: { [x: string]: ShopNavigationItem },
  pathArray: string[],
): ShopNavigationItem | undefined => {
  let current: ShopNavigationItem | undefined = object[pathArray[0]];
  for (let i = 1; i < pathArray.length && current; i++) {
    if (current.subpages) {
      current = current.subpages[pathArray[i]];
    } else {
      return undefined;
    }
  }
  return current;
};

const popupButtons = [{ id: 1, textContent: 'select' }];
const popupButtonsForModels = [
  { id: 1, textContent: 'chat', redirect: PAGES.CHAT },
  { id: 2, textContent: 'customize', redirect: PAGES.CUSTOMIZE },
  { id: 3, textContent: 'select' },
];

export const ShopSubpage: ShopSubpageComponent = ({ slug }) => {
  const shopNavigationList = getValueByPath(shopNavigation, slug);
  const heading = slug[slug.length - 1];

  return (
    <>
      {shopNavigationList && shopNavigationList.subpages && (
        <ShopSlider heading={heading} shopNavigation={Object.values(shopNavigationList.subpages)} />
      )}
      {shopNavigationList && 'products' in shopNavigationList && (
        <Container>
          <PageHeading textContent={heading} />
          <ListWithPopup
            popupButtons={heading === MODELS_PAGES.FEMALE ? popupButtonsForModels : popupButtons}
            itemsPerRow={2}
            list={shopNavigationList.products?.sort((a, b) => Number(b.available) - Number(a.available))}
          />
        </Container>
      )}
    </>
  );
};
