//export const urlPrefix = process.env.VUE_APP_BACKEND
export const urlPrefix = window.g.baseURL

export function getListURL() {
  return urlPrefix+'kube/query'
}

export function getCreateSthURL() {
  return urlPrefix+'kube/create'
}

export function getUpdateSthURL() {
  return urlPrefix+'kube/update'
}

export function getGetSthURL() {
  return urlPrefix+'kube/get'
}

export function getDeleteSthURL() {
  return urlPrefix+'kube/delete'
}

export function getMetaDataURL() {
  return urlPrefix+'meta/query'
}

export function updateMetaDataURL() {
  return urlPrefix+'meta/update'
}

export function deleteMetaDataURL() {
  return urlPrefix+'meta/delete'
}

export function createMetaDataURL() {
  return urlPrefix+'meta/create'
}

export function getJsonDataURL() {
  return urlPrefix+'res/query'
}

export function updateJsonDataURL() {
  return urlPrefix+'res/update'
}

export function deleteJsonDataURL() {
  return urlPrefix+'res/delete'
}

export function createJsonDataURL() {
  return urlPrefix+'res/create'
}

export function queryOperationURL() {
  return urlPrefix+'exec/query'
}

export function getScheduleURL() {
  return urlPrefix+'networkFlow/solveBase'
}

export function create() {
  return urlPrefix + 'atomic/create'
}

export function update() {
  return urlPrefix + 'atomic/update'
}

export function remove() {
  return urlPrefix + 'atomic/delete'
}

export function get() {
  return urlPrefix + 'atomic/get'
}

export function list() {
  return urlPrefix + 'atomic/query'
}

export function metaURL() {
  return urlPrefix + 'atomic/getMeta'
}

export function sysInfoURL() {
  return urlPrefix + 'atomic/getSysInfo'
}

export function getAllKinds() {
  return urlPrefix + 'atomic/getKinds'
}





