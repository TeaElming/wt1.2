import fetch from 'node-fetch'
import 'reflect-metadata'

/**
 * Service for handling group related API requests.
 */
export class GroupService {
  /**
   * Constructor for the GroupService.
   *
   * @param {object} tokenStoreDependency - The tokenStoreDependency.
   */
  constructor (tokenStoreDependency) {
    this.tokenStoreDependency = tokenStoreDependency
  }

  /**
   * Get the total amount of groups.
   *
   * @returns {Promise} - The total amount of groups.
   */
  async getTotalGroups () {
    const token = this.tokenStoreDependency.getToken()
    try {
      const response = await fetch('https://gitlab.lnu.se/api/v4/groups', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      // Check the response header for info about pagnation
      const totalGroups = response.headers.get('X-Total')

      console.log('Total groups:', totalGroups)
      return totalGroups
    } catch (error) {
      console.error('Failed to get total groups:', error)
    }
  }

  /**
   * Get the top groups and subgroups.
   *
   * @returns {Promise} - The top groups and subgroups.
   */
  async getTopGroupsAndSubgroups () {
    const token = this.tokenStoreDependency.getToken()
    console.log(token)
    const query = `
      query {
        currentUser {
          groups(first: 5) {
            edges {
              node {
                id
                name
                webUrl
                avatarUrl
                projects(first: 3) {
                  edges {
                    node {
                      id
                      name
                      webUrl
                      description
                      avatarUrl
                      repository {
                        rootRef
                        tree {
                          lastCommit {
                            author {
                              name
                              avatarUrl
                            }
                            committedDate
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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

    const groupData = await response.json()
    console.log(groupData)
    return groupData
  }

  /**
   * Get the total amount of projects for a group.
   *
   * @param {string} groupId - The id of the group.
   * @returns {Promise} - The total amount of projects.
   */
  async getProjectCount (groupId) {
    const token = this.tokenStoreDependency.getToken()

    const matches = groupId.match(/\d+$/)

    if (matches) {
      const digits = matches[0]
      // Setting one per page to limit the amount of data we get back, only care about X-total anyways
      const response = await fetch(`https://gitlab.lnu.se/api/v4/groups/${digits}/projects?per_page=1`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const totalProjects = response.headers.get('X-Total')
      console.log('Total projects:', totalProjects)
      return totalProjects
    } else {
      console.log('No id identified.')
    }
  }
}
