import { Request, Response } from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/react-ssr';

import App from '../shared/App';
import NotFound from '@pages/NotFound';
import apolloClient from '../state/config';
import * as layout from './layout';
const fs = require('fs');
const dotenv = require('dotenv');

const devMiddleware = async (req: Request, res: Response, next, createLogger) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const initialState = apolloClient.extract();

  if (req.query.env) {
    let envConfig;
    if (req.query.env === 'prod') {
      envConfig = dotenv.parse(fs.readFileSync('.env.prod'));
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
      initialState.ROOT_QUERY.process = 'PROD';
      createLogger();
    } else {
      envConfig = dotenv.parse(fs.readFileSync('.env.dev'));
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
      initialState.ROOT_QUERY.process = 'DEV';
      createLogger();
    }
  }

  const sheet = new ServerStyleSheet();
  const Markup = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  await getDataFromTree(Markup);

  try {
    const styledMarkup = sheet.collectStyles(Markup);
    const bodyStream = sheet.interleaveWithNodeStream(renderToNodeStream(styledMarkup));
    console.log('önce', initialState);
    res.write(layout.top({ state: initialState }));
    console.log('sonra', initialState);

    bodyStream.on('data', async (chunk) => res.write(chunk));

    bodyStream.on('end', () => {
      res.write(layout.bottom());
      res.end();
    });

    bodyStream.on('error', (err) => {
      console.error('react render error:', err);
    });
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

// // Not found
// router.use((req: Request, res: Response) => {
//   const sheet = new ServerStyleSheet()

//   try {
//     const html = renderToStaticMarkup(sheet.collectStyles(<NotFound />))
//     const styleTags = sheet.getStyleTags()

//     res.status(404).send(layout.staticLayout({ styleTags, content: html }))
//   } catch (error) {
//     console.error(error)
//   } finally {
//     sheet.seal()
//   }
// })

export default devMiddleware;
