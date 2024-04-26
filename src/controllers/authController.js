/**
 * @module controllers/authController
 */
export class AuthController {
  /**
   * Creates an instance of the AuthController class.
   *
   * @param {object} authServiceDependency - The authentication service dependency injected into the controller.
   * This service is responsible for the actual authentication processes like login, logout, etc.
   */
  constructor (authServiceDependency) {
    this.authService = authServiceDependency
  }

  /**
   * Renders the login page.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  renderLogin (req, res, next) {
    const gitlabUrl = `https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.appID}&redirect_uri=${encodeURIComponent(process.env.callbackUrl)}&response_type=code&scope=read_api read_user profile`

    res.render('auth/login', { gitlabUrl, hideHeader: true })
  }

  /**
   * Handles the OAuth callback.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  async handleOAuthCallback (req, res, next) {
    const code = req.query.code
    console.log(code)

    try {
      const tokenData = await this.authService.exchangeCodeForToken(code)
      console.log(tokenData)
      res.redirect('/home') // Redirect to the home page
    } catch (error) {
      console.error('Error during code exchange:', error)
      res.status(500).send('An error occurred during the OAuth process.')
    }
  }

  /**
   * Handles the logout process.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  handleLogOut (req, res, next) {
    this.authService.logout()
    res.render('auth/logout')
  }
}
