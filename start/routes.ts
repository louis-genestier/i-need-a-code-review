/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Auth
const AuthController = () => import('#controllers/auth_controller')
router.get('/github/redirect', [AuthController, 'githubRedirect'])
router.get('/github/callback', [AuthController, 'githubCallback'])
router.get('/logout', [AuthController, 'logout']).use(middleware.auth())

// home
const HomeController = () => import('#controllers/home_controller')
router.get('/', [HomeController, 'index']).use(middleware.silentAuth())

// pull requests
const PullRequestsController = () => import('#controllers/pull_requests_controller')
router.post('/pull-requests', [PullRequestsController, 'store']).use(middleware.auth())
