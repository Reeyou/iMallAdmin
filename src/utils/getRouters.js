
export default function getRouters(Routers) {
  let resultRouters = []
  Routers.map(route => {
    resultRouters.push({
      key: route.key,
      path: route.path,
      exact: route.exact,
      upperName: route.upperName,
      name: route.name,
      component: route.component
    })
    if(route.routers) {
      route.routers.map(routeItem => {
        resultRouters.push({
          key: routeItem.key,
          path: routeItem.path,
          upperName: routeItem.upperName,
          name: routeItem.name,
          exact: routeItem.exact,
          component: routeItem.component
        })
      })
    }
  })
  return resultRouters
}

