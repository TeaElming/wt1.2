/**
 * ProfileController
 */
export class ProfileController {
  /**
   * Constructor for the ProfileController class.
   *
   * @param {object} profileService - The profile service object, which is responsible for fetching profile data.
   */
  constructor (profileService) {
    this.profileService = profileService
  }

  /**
   * Renders the profile page.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  async renderProfilePage (req, res, next) {
    try {
      const profile = await this.profileService.getProfile()

      if (!profile || !profile.data || !profile.data.currentUser) {
        throw new Error('Profile data is missing or incomplete.')
      }

      res.render('profile/profile', { profile: profile.data.currentUser })
    } catch (error) {
      console.error('Error fetching profile:', error)
      // Redirect to the base path on error
      res.redirect('/')
    }
  }

  /**
   * Renders the activities page.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  async renderActivitiesPage (req, res, next) {
    try {
      const activities = await this.profileService.getActivities()

      if (!activities) {
        throw new Error('Activities data is missing or incomplete.')
      }

      res.render('activities/activities', { activities })
    } catch (error) {
      console.error('Error fetching activities:', error)
      // Redirect to the base path on error
      res.redirect('/')
    }
  }
}
