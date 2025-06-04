import type { FC } from 'react';

interface ShopPageProps {
  params: Promise<{ slug: string[] }>;
}

const ShopPage: FC<ShopPageProps> = async ({ params }) => {
  const { slug } = await params;

  return <>{slug}</>;
};

export default ShopPage;
