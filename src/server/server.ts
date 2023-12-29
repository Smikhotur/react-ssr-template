import express from 'express'
import renderer from './renderer'
import { createStore } from '../store'
import { LoaderFunctionArgs, matchRoutes } from 'react-router-dom'
import { routes } from '../Routes'
import proxy from 'express-http-proxy'
import { RequestOptions } from 'https'
import { LoaderFunctionParams } from '../types'
import { ChunkExtractor } from '@loadable/server'
import path from 'path'

const app = express()

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts: RequestOptions) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      opts.headers!['x-forwarded-host'] = 'localhost:3000'
      return opts
    },
  })
)
// eslint-disable-next-line import/no-named-as-default-member
app.use(express.static('./dist/client', { index: false }))

app.get('*', (req, res) => {
  const statsFile = path.resolve('./dist/client/loadable-stats.json')
  const store = createStore(req)

  const loaderArgs: LoaderFunctionArgs = store as LoaderFunctionParams
  res.setHeader('content-type', 'text/html')
  const promises = matchRoutes(routes, req.path)
    ?.map(({ route }) => {
      return route.loader ? route.loader(loaderArgs) : null
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((promise: Promise<any>) => {
      if (promise) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })
  const extractor = new ChunkExtractor({ statsFile })
  const scriptTags = extractor.getScriptTags()

  if (promises) {
    Promise.all(promises).then(() => {
      res.send(renderer(req, store, scriptTags))
    })
  } else {
    res.send(renderer(req, store, scriptTags))
  }
})

app.listen(3000, () => {
  console.log('Listening on PORT http://localhost:3000')
})
