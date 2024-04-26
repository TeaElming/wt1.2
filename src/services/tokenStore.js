/**
 * TokenStore class
 */
export class TokenStore {
  /**
   * Constructor for TokenStore.
   */
  constructor () {
    this.token = null
  }

  /**
   * Set token in TokenStore.
   *
   * @param {string} token - The token to set.
   */
  setToken (token) {
    this.token = token
  }

  /**
   * Get token from TokenStore.
   *
   * @returns {string} - The token.
   */
  getToken () {
    return this.token
  }
}
