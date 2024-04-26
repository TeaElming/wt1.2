import fetch from 'node-fetch'
import 'reflect-metadata'

/**
 * ProfileService is a class that fetches profile data from the GitLab API.
 */
export class ProfileService {
  /**
   * Constructor for the ProfileService.
   *
   * @param {object} tokenStoreDependency - The tokenStoreDependency.
   */
  constructor (tokenStoreDependency) {
    this.tokenStoreDependency = tokenStoreDependency
  }

  /**
   * Get the profile data.
   *
   * @returns {Promise} - The profile data.
   */
  async getProfile () {
    const token = this.tokenStoreDependency.getToken()
    console.log('Token:', token)
    const query = `
      query {
        currentUser {
          username
          avatarUrl
          name
          publicEmail
          lastActivityOn
        }
      }
    `

    const response = await fetch('https://gitlab.lnu.se/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()
    console.log(data)
    return data
  }

  /**
   * Get the activities data.
   *
   * @returns {Promise} - The activities data.
   */
  async getActivities () {
    const token = this.tokenStoreDependency.getToken()
    const gitlabApiUrl = 'https://gitlab.lnu.se/api/v4'
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    // Fetch the first 100 activities
    const first100Response = await fetch(`${gitlabApiUrl}/events?per_page=100`, { headers })
    const first100Activities = await first100Response.json()

    // Double check that we do have more than 100 activities

    if (first100Activities.length < 100) {
      console.log('Less than 100 activities found:', first100Activities)
      return first100Activities
    }

    // Fetch one more activivty, this can be altered later to fetch more than 101 activities
    const oneMoreResponse = await fetch(`${gitlabApiUrl}/events?per_page=1&page=2`, { headers })
    const oneMoreActivity = await oneMoreResponse.json()

    const all101Activities = first100Activities.concat(oneMoreActivity)

    console.log('All 101 activities:', oneMoreActivity)
    return all101Activities
  }
}
