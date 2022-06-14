# Thesis Client Application Template (Next.js)

Base template for Thesis landing pages using Next.js and Storyblok.

- [Next.js docs](https://nextjs.org/docs/#setup)
- [Storyblok tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes)
- [Storybook tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/)
- [swr docs](https://github.com/vercel/swr)

## Table of Contents

- [App Setup](#app-setup)
- [Custom Routing](#custom-routing)
- [Storyblok Setup](#storyblok-setup)
- [Storybook Setup](#storybook-setup)
- [CLI Commands](#cli-commands)
- [Params/Tracking](#paramstracking)
- [Storyblok Data-Fetching](#storyblok-data-fetching)
- [File Structure](#file-structure)
- [SWR](#swr)

## App Setup

`client-app-next` assumes you have the client app repository and the `tpl-vue` repository in the same parent directory as `tpl-vue` is a file dependency. Your file struture should look like this:

```
.
├── client-app-next
└── tpl-vue
```

If you follow this structure then...

```console
yarn install
```

If you want to rebuild tpl-vue scripts (local package must be latest version)...

```console
yarn build:tpl
```

Finally...

```console
yarn dev
```

And open up http://localhost:3000/!

## Custom Routing

This app uses custom routing through `routes.json` rather than Next.js' traditional [file system routing](https://nextjs.org/docs/routing/introduction). Pages will still live in the `pages` directory, but filenames can be whatever as long as they are correctly mapped in `routes.json`. This allows us to easily create duplicate pages/variants where different urls lead to the same page file rather than having to continuously copy and paste files to match the file system routing or rewrite using `getStaticPaths`.

### How is this being done?

- `routes.json` is passed to `exportPathMap` in `next.config.js` to define our custom routes
- `exportPathMap` is overwritten by `getStaticProps` during build, so instead we use `getInitialProps` + `next export` at build to render to static

## Storyblok Setup

If you want to create a new page with content loaded from Storyblok:

1. Go to http://app.storyblok.com/ and login or create an account
2. If this is a new app, create a new space
3. Go to your space > Settings > Location and change to http://localhost:3000/
4. Still in Settings, go to the API-Keys tab and copy the key there (**if the key isn't labeled `preview` then create a new one with access level `Preview`**)
5. Go to lib/core/storyblok.js and replace the `accessToken` field with the api key
6. In console, run `yarn generate` and follow the steps to make a new page
7. Go back to your Storyblok space > Content > click +Entry button
8. Go to your new pages's config tab and change the Slug field to the filename you used when generating your page with the CLI
9. Fill out page content in Storyblok

And that's it! You should be able to run `yarn dev` and start mapping the content in the generated page file.

If visuals are needed you can also check out the Storyblok tutorial link above.

## Storybook Setup

To properly setup Storybook to deploy on chromatic (if you don't have access ask Pace/Vane/Isak to add you as a collaborator):

1. Go to https://www.chromatic.com/ > Go to app > Add project > Add by project name > enter your cloned repo's name
2. Go to your newly created project > Manage > Configure > copy the project token
3. Go to the Settings for your cloned version of this repo > Secrets
4. If `CHROMATIC_PROJECT_TOKEN` is there, update it. If not, add it

That's it! Storybook will now deploy to chromatic on push. You can add stories in `stories/components` and preview with `yarn storybook`.

## CLI Commands

### `yarn generate`

This command uses `plop` to generate boilerplate files based on your input. Selecting one of the options will prompt you to provide data to create the files.

**Choosing new page**  
This adds the new route to `routes.json` and generates the boilerplate files for a new page (`pages/filename.js` and `styles/pages/filename.scss`).

Example usage: `yarn generate` and then selecting `Create a new page` with `/new-page` as the route and `page_a` as the filename will generate:

- `{ "/new-page": { "page": "page_a" } }` in `routes.json`
- `page_a.js` in the `pages` directory
- `page_a.scss` in the `styles/pages` directory

**Choosing new component**  
This generates the boilerplate files for a new component (`components/name.js` and `stories/components/name.stories.jsx`).

Example usage: `yarn generate` and then selecting `Create a new component` with the name `Callout` will generate:

- `Callout.js` in the `components` directory
- `Callout.stories.jsx` in the `stories/components` directory

### `yarn routes`

Lists out all routes from `routes.json`. WIP - will also generate staging links.

## Params/Tracking

**`lib/core/CTAConfig.js`** mimics `static-shock/params` + `tracking.js` in our Ruby on Rails client repo.  
Params + tracking click events are added on page load complete due to `tpl-vue` not being full rendered `DOMContentLoaded`.

Editing base param configs is very similar to the original client-app. Just go to `pages/_app.js`:

```javascript
<CTAConfig
  enabledParams={
    {
      // utm_source: true,
      // utm_medium: true,
      // utm_content: true,
      // utm_campaign: true,
      // utm_term: true,
    }
  }
/>
```

You can treated the param object exactly the same way as in the original client-app.

Overriding params on a page-by-page basis is also possible. Just import and use the `useCTAConfig` hook.

```javascript
import { useCTAConfig } from '@core/CTAConfig'

export default function Page() {
  const { useOverrideCTA } = useCTAConfig()

  useOverrideCTA({
    utm_source: 'override_value',
  })
}
```

## Storyblok Data-Fetching

To fetch data from Storyblok, use the `getPageContent` function from `@core/storyblok`. This function accepts 2 arguments: `slug` (required) and `contentKey` (optional - defaults to 'body').

**`slug`** - whatever the Slug field is for your page on Storyblok. The CLI `yarn new:page` command defaults this to the filename argument.  
**`contentKey`** - whatever top level key your page content is nested under. Storyblok + the function defaults this to `'body'`. In the Storyblok editor it looks like this:

<img width="992" alt="Screen Shot 2022-01-10 at 4 11 29 PM" src="https://user-images.githubusercontent.com/56734437/148840052-6954a035-a41b-4c5e-8ab6-e015d78b4964.png">  
  
Only call this function within `getStaticProps` as the api call and data formatting is an expensive operation.  
  
## Using SCSS files  
Due to how Next.js compiles scss, you will need to import your stylesheets into your page component and then nest them under a styled jsx tag.  
  
Example usage:  
```javascript  
import styles from '@styles/pages/page.scss'  
  
export default function Page() {
  return (
    <div>
      <style jsx>{styles}</style>
    </div>
  )
}
```  
It doesn't really matter where in the html the style tag goes as it gets applied globally to the page. Probably best to put it higher up though.  
  
## File Structure  
Next.js enforces a file structure, so this is how we have it set up:  
```
.  
├── .github             
│   └── workflows        # github workflows
├── .husky              # pre-commit hooks  
├── .storybook          # storybook config files
├── components          # custom components
│   └── analytics       # pixels
├── generators          # plop generators
│   ├── actions         # custom plop actions  
│   ├── options         # boilerplate options  
│   └── templates       # boilerplate templates  
├── lib
│   ├── cli             # cli commands  
│   └── core            # core files  
├── page-content        # JSON page content for non-CMS pages  
├── pages               # all pages should go here  
├── public  
│   ├── fonts  
│   ├── images  
│   └── tpl             # files generated from tpl-vue build  
├── stories             # storybook stories  
│   ├── assets          # assets for stories  
│   └── components      # component stories   
├── styles              # stylesheets  
│   └── pages  
├── .babelrc            # babel config for scss  
├── .eslintignore  
├── .eslintrc           # eslint settings  
├── .gitignore   
├── .lintstagedrc.js    # lint-staged settings  
├── .prettierrc  
├── jsconfig.json  
├── next.config.js       # next config  
├── package.json  
├── plopfile.js          # plop entry/config file  
├── routes.json         # routes passed to exportPathMap in next.config.js  
└── tpl-vue.config.js    # vue config for tpl-vue  
```

## SWR

The app is configured with Vercel's `swr` package. If you need to do client-side data fetching use the `useSWR` hook. The `fetcher` argument is globally configured in `pages/_app.js` so you can just call it without that argument.

Example usage:

```javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user')

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

For more info, see the swr docs link above.
