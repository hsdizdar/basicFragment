import { oneLineTrim } from 'common-tags';
import { isProd } from './utils';
import pkg from '../../package.json';

interface HeadParams {
  state: any;
  styleTags: string;
}

const head = ({ styleTags, state = {} }: HeadParams): string => oneLineTrim`<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${pkg.name}-v${pkg.version}</title>
    ${styleTags || ''}
    ${
      state &&
      `<script>${`window.__${pkg.name.toUpperCase()}_INITIAL_STATE__=${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )};`}</script>`
    }
  </head>`;

export const top = (params: HeadParams): string => oneLineTrim`${head(params)}<body><div id="basicFragment">`;

export const bottom = (): string => oneLineTrim`</div>
          <script defer="defer" src="/${pkg.name}.js"></script>
          ${!isProd && '<script defer="defer" src="/reload/reload.js"></script>'}
        </body>
      </html>`;

export const staticLayout = ({ styleTags, content }): string => oneLineTrim`${head({ styleTags })}
        <body>${content}</body>
        ${!isProd && '<script defer="defer" src="/reload/reload.js"></script>'}
      </html>
    `;
