import fetch from 'node-fetch'
import 'reflect-metadata'

/**
 * Class representing the AuthService.
 */
export class AuthService {
  /**
   * Create the AuthService.
   *
   * @param {object} tokenStoreDependency   - The tokenStoreDependency.
   */
  constructor (tokenStoreDependency) {
    this.tokenStoreDependency = tokenStoreDependency
  }

  /**
   * Get the login URL.
   *
   * @param {string} code - The code to exchange for a token.
   * @returns {Promise} - The data from the token exchange.
   */
  async exchangeCodeForToken (code) {
    const response = await fetch('https://gitlab.lnu.se/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.appID,
        client_secret: process.env.appSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.callbackUrl
      })
    })
    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const data = await response.json()
    console.log('Token data in authService:', data.access_token)

    this.tokenStoreDependency.setToken(data.access_token)
    console.log('Retrieved from tokenstore:', this.tokenStoreDependency.getToken())
    return data
  }

  /**
   * Logs the user out.
   */
  logout () {
    this.tokenStoreDependency.setToken(null)
  }
}
