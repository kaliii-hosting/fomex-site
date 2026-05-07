import { siteConfig } from '../config/site.config'

const { domain, storefrontToken, apiVersion } = siteConfig.shopify

function shopifyFetch(query, variables = {}) {
  if (!domain || !storefrontToken) return Promise.resolve(null)
  return fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  }).then(r => r.json())
}

export async function fetchAllProducts(first = 50) {
  const data = await shopifyFetch(`{
    products(first: ${first}) {
      edges {
        node {
          id title handle description productType tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
          variants(first: 10) {
            edges {
              node {
                id title priceV2 { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }`)
  if (!data?.data?.products) return []
  return data.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    productType: node.productType,
    tags: node.tags,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    image: node.images.edges[0]?.node?.url || null,
    imageAlt: node.images.edges[0]?.node?.altText || node.title,
    variants: node.variants.edges.map(({ node: v }) => ({
      id: v.id,
      title: v.title,
      price: parseFloat(v.priceV2.amount),
      available: v.availableForSale,
      options: v.selectedOptions,
    })),
  }))
}

export async function fetchCollections(first = 20) {
  const data = await shopifyFetch(`{
    collections(first: ${first}) {
      edges { node { id title handle image { url altText } } }
    }
  }`)
  if (!data?.data?.collections) return []
  return data.data.collections.edges.map(({ node }) => node)
}

export async function fetchCollectionProducts(handle, first = 50) {
  const data = await shopifyFetch(`{
    collection(handle: "${handle}") {
      products(first: ${first}) {
        edges {
          node {
            id title handle productType
            priceRange { minVariantPrice { amount currencyCode } }
            images(first: 1) { edges { node { url altText } } }
          }
        }
      }
    }
  }`)
  if (!data?.data?.collection?.products) return []
  return data.data.collection.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    productType: node.productType,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    image: node.images.edges[0]?.node?.url || null,
  }))
}
