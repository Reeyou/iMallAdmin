import Item from "antd/lib/list/Item";

export default function getRouters(Routers) {
  let resultRouters = []
  Routers.map(route => {
    resultRouters.push({
      key: route.key,
      path: route.path,
      exact: route.exact,
      name: route.name,
      component: route.component
    })
    if(route.routers) {
      route.routers.map(routeItem => {
        resultRouters.push({
          key: routeItem.key,
          path: routeItem.path,
          upperPath: routeItem.upperPath,
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

