import StoryblokClient from 'storyblok-js-client'

export const Storyblok = new StoryblokClient({
  // Read-only - replace with new access token for new client
  accessToken: 'WP4GaYQEFXxP9zrSf9Q8hwtt',
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

/**
 * Returns formatted page content from Storyblok.
 * Content gets converted from an array to an object with each
 * component nested under a key of its component name.
 *
 * Base blocks (title_block, media_block, etc.) get converted from arrays to objects.
 *
 * Note: this is an expensive operation and should only be called in getStaticProps/getInitialProps to
 * avoid computing on client side.
 *
 * @param {string} slug - page slug to retrieve data from Storyblok. Aka "Slug" key in storyblock editor.
 * @param {string} [contentKey=body] - top level key that page content is nested under
 *
 * @returns {Object} - object containing formatted data from Storyblok api
 */
export const getPageContent = async (slug, contentKey = 'body') => {
  const { data } = await Storyblok.get(`cdn/stories/${slug}`, {
    version: 'draft',
  })

  if (data) {
    const contentMap = {}
    const blocks = data.story.content[contentKey]
    blocks.forEach((block) => {
      for (let key in block) {
        if (key.includes('_block')) {
          block[key] = {
            ...block[key][0],
          }
        }
      }

      contentMap[block.component] = block
    })

    data.story.content[contentKey] = contentMap

    return data.story
  } else {
    return {}
  }
}
