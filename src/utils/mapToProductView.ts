interface ProductView {
  id: string | number;

  name: string;
  brand?: string;
  article?: string;
  number?: string;

  image: string;
  gallery: string[];

  price?: number;
  currency?: string;
  presence?: string;
  availableCount?: number;
  warehouse?: string;

  deliveryDays?: number;

  description?: string;
  attributes?: { key: string; value: string }[];

  using?: string;

  raw: {
    state?: any;
    details?: any;
  };
}

export const mapToProductView = (
  productFromState?: any,
  details?: any
): ProductView | null => {
  if (!productFromState && !details) return null;

  return {
    id: productFromState?.ItemId ?? details?.articleId,

    name: productFromState?.Name ?? details?.name ?? 'Без названия',

    brand: productFromState?.Brand ?? details?.brand,

    article: productFromState?.Article ?? productFromState?.CleanArticle,

    number: details?.number ?? productFromState?.Article,

    image: productFromState?.PhotoItem ?? details?.images?.[0] ?? '',

    gallery: [
      ...(productFromState?.PhotoItem ? [productFromState.PhotoItem] : []),
      ...(details?.images ?? []),
    ],

    price: productFromState?.Price,
    currency: productFromState?.CurrencyCode ?? 'KZT',
    presence: productFromState?.Presence,
    availableCount: productFromState?.AvailableCount,
    warehouse: productFromState?.Warehouse,

    deliveryDays:
      productFromState?.GuaranteedDelivery ??
      productFromState?.ExpectedDelivery,

    description: details?.description ?? productFromState?.Using,

    attributes: details?.attributes
      ? details.attributes
      : productFromState?.Parameters
      ? Object.entries(productFromState.Parameters).map(([key, value]) => ({
          key,
          value: String(value),
        }))
      : [],

    using: productFromState?.Using,

    raw: {
      state: productFromState,
      details,
    },
  };
};
