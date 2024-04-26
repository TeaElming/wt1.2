/**
 * @file This file contains the home controller class, which is responsible for rendering the home page.
 */
export class HomeController {
  /**
   * Renders home page.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  async renderHomePage (req, res, next) {
    res.render('home/home')
  }
}
