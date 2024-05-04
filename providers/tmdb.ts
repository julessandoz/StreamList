import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator()

export const getImage: ProviderGetImage = (
  src,
  { baseURL } = {}
) => {

  if (!baseURL) {
    // also support runtime config 
    baseURL = useRuntimeConfig().public.siteUrl
  }

  return {
    url: joinURL(baseURL, src),
  }
}
