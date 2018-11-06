/*eslint-disable */
const collection = 'launch'
const url = `/v3/launches`
const resolvers = {
  Query: {
    launches: async (obj, { find, order, sort, limit, id }, context) => {
      const data = await context.db
        .collection(collection)
        .find(context.find({ query: { ...find }, url }))
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunches)
        .toArray()

      return data
    },
    launchesPast: async (obj, { find, order, sort, limit, id }, context) => {
      const data = await context.db
        .collection(collection)
        .find({ upcoming: false, ...context.find({ query: { ...find }, url }) })
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunches)
        .toArray()

      return data
    },
    launchesUpcoming: async (
      obj,
      { find, order, sort, limit, id },
      context
    ) => {
      const data = await context.db
        .collection(collection)
        .find({ upcoming: true, ...context.find({ query: { ...find }, url }) })
        .project(context.project({ id }))
        .sort(context.sort({ query: { order, sort }, url }))
        .limit(context.limit({ limit }))
        .map(parseLaunches)
        .toArray()

      return data
    },
    launch: async (obj, { flight_number, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ flight_number })
        .project(context.project({ id }))
        .map(parseLaunches)
        .toArray()

      return data
    },
    launchLatest: async (obj, { id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ upcoming: false })
        .project(context.project({ id }))
        .sort({ flight_number: -1 })
        .limit(1)
        .map(parseLaunches)
        .toArray()

      return data
    },
    launchNext: async (obj, { flight_number, id }, context) => {
      const [data] = await context.db
        .collection(collection)
        .find({ upcoming: true })
        .project(context.project({ id }))
        .sort({ flight_number: -1 })
        .limit(1)
        .map(parseLaunches)
        .toArray()

      return data
    }
  }
}

const parseLaunches = launch => {
  const { reuse, ...rest } = launch
  return rest
}

module.exports = resolvers
