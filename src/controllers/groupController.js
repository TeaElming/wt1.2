/**
 * GroupController
 */
export class GroupController {
  /**
   * Constructor  for GroupController.
   *
   * @param {object} groupSerivce - The group service
   */
  constructor (groupSerivce) {
    this.groupService = groupSerivce
  }

  /**
   * Renders the groups and projects page.
   *
   * @param {object} req - The HTTP request object, which contains the request query, body, headers, etc.
   * @param {object} res - The HTTP response object used to return data back to the client.
   * @param {Function} next - The callback function to pass control to the next middleware function in the stack. Useful for error handling or if the method cannot handle the request itself.
   */
  async renderGroupsAndProjectsPage (req, res, next) {
    try {
      const dataPromise = this.groupService.getTopGroupsAndSubgroups()
      const totalGroupsPromise = this.groupService.getTotalGroups()

      // Wait for both promises to resolve before proceeding
      const [data, totalGroups] = await Promise.all([dataPromise, totalGroupsPromise])

      // Ensure data is valid before proceeding
      if (!data || !data.data || !data.data.currentUser || !data.data.currentUser.groups || !data.data.currentUser.groups.edges) {
        throw new Error('Invalid data structure') // This will be caught by the catch block below
      }

      const groups = await Promise.all(data.data.currentUser.groups.edges.map(async (edge) => {
        try {
          // Fetch the total project count for each group
          const projectCount = await this.groupService.getProjectCount(edge.node.id)

          return {
            name: edge.node.name,
            webUrl: edge.node.webUrl,
            projectCount,
            projects: edge.node.projects.edges.map(projectEdge => ({
              name: projectEdge.node.name,
              webUrl: projectEdge.node.webUrl,
              description: projectEdge.node.description,
              avatarUrl: projectEdge.node.avatarUrl || '/imgs/projectIcon.png',
              lastCommit: projectEdge.node.repository.tree.lastCommit
                ? {
                    author: {
                      name: projectEdge.node.repository.tree.lastCommit.author.name,
                      avatarUrl: projectEdge.node.repository.tree.lastCommit.author.avatarUrl || '/imgs/userIcon.png'
                    },
                    committedDate: projectEdge.node.repository.tree.lastCommit.committedDate
                  }
                : {
                    author: { name: 'N/A', avatarUrl: 'default_author_avatar_url' },
                    committedDate: 'N/A'
                  }
            }))
          }
        } catch (error) {
          console.error('Error fetching project count for group:', edge.node.id, error)
          throw error // Re-throw to be caught by the outer catch block
        }
      }))

      groups.forEach(group => {
        group.projects.forEach(project => {
          console.log(project) // This logs each project object
        })
      })

      res.render('groups/groups', { groups, totalGroups })
    } catch (error) {
      console.log('Error encountered, redirecting to login page:', error)
      res.redirect('/')
    }
  }
}
