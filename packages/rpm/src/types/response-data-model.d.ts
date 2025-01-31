export interface AlovaResponse<T> {
  code: number
  data: T
  message: string
}
export interface DepartmentList {
  label: string
  value: string
  children?: Array<DepartmentList>
}

export interface WebsiteBaseInfo {
  websiteId: string
  departmentName: string
  websiteUrl: string
  websiteName: string
  websiteLogo: string
}

export interface WebsiteDetailInfo extends WebsiteBaseInfo {
  apiNum: number
  routeNumber: number
}

export interface RoleListItem {
  roleId: string
  roleName: string
}
export interface GetRoleList {
  total: number
  row: RoleListItem[]
}

export interface WebsiteApiInfo {
  apiDescription: string
  apiId: string
  apiMethod: string
  apiType: 'globalApi' | 'pageApi'
  apiUrl: string
  routeId: string | null
  websiteId: string
}
export interface WebsiteRouteInfo {
  routeId: string
  routeDescription: string
  routeUrl: string
  websiteId: string
  pageApi: WebsiteApiInfo[]
  apiCount: number | null
}

export type WebsitePermissions = {
  globalApi: WebsiteApiInfo[]
  routes: WebsiteRouteInfo[]
}
