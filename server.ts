/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// DOM libs required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import * as express from 'express';
import {readFileSync} from 'fs';
import * as domino from 'domino';
import {join} from 'path';
import * as compression from 'compression';
import {IncomingMessage} from 'http';
import * as debug from 'debug';

const log = debug('SSR Sever');

/**
 * This tells us if we are running on google cloud platform
 */
const { GCLOUD_PROJECT } = process.env;

/**
 * Define the port in which you want your server to run.
 * When running under Firebase environment this is not applicable, since it runs on Cloud Functions.
 */
const PORT = process.env.PORT || 4000;

/**
 * The public folder path, by default in Angular it will be `dist/browser`
 */
const PUBLIC_FOLDER = join(process.cwd(), 'dist/browser');

/**
 * The template name is the html file under the public folder that will be
 * used by Angular to render your application.
 */
const TEMPLATE_NAME = 'template.html';

const templateString = readFileSync(join(PUBLIC_FOLDER, TEMPLATE_NAME)).toString();
const win: Window = domino.createWindow(templateString);

/**
 * Add a fake window so we have less problems with broser code in the server
 */
(global as any).window = win;
(global as any).document = win.document;
(global as any).navigator = win.navigator;
(global as any).localStorage = win.localStorage;

/**
 * Create the express server
 */
const app = express();

/**
 * Get all required Angular dependencies from the build
 * NOTE :: leave this as require() since this file is built Dynamically from webpack
 */
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

/**
 * The Angular universal engine
 * @see https://github.com/angular/universal/tree/master/modules/express-engine
 */
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

/**
 * The the renderer to html
 */
app.set('view engine', 'html');
app.set('views', PUBLIC_FOLDER);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });

/**
 * Serve static files from the public folder
 */
app.get('*.*', express.static(PUBLIC_FOLDER, {
  maxAge: '1y'
}));

/**
 * Enable response compression
 */
app.use(compression());


/**
 * By default all regular routes use the Universal engine
 * But you can modify this later.
 */
app.get('*', (req: IncomingMessage, res: express.Response) => {
  res.render(TEMPLATE_NAME, { req });
});

/**
 * Start the Express server only if we are not in cloud functions environment
 */
if (!GCLOUD_PROJECT) {
  app.listen(PORT, () => {
    log(`Listening on http://localhost:${PORT}`);
  });
}

export const server = app;
