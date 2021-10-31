import axios from 'axios'
import { NavigationReference } from '../Navigation/NavigationReference'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
require('dotenv').config()

export function apiRequest(type, api, changes, body) {
  switch (type) {
    case 'post':
      axios
        .post(NavigationReference.api + api, body)
        .then((res) => {
          changes(res)
        })
        .catch((err) => {
          changes({ error: err })
        })
      break
    case 'get':
      axios
        .get(NavigationReference.api + api)
        .then((res) => {
          changes(res)
        })
        .catch((err) => {
          changes({ error: err })
        })
      break
    default:
      axios.get(api).then((res) => {
        changes(res)
      })
  }
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export function genrateRandomToken() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxx-xyyxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export async function uploadFile(file, fileName, fileType, container) {
  let sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS
  let storageAccount = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT
  console.log(container, fileName)
  const blobService = new BlobServiceClient(
    `https://${storageAccount}.blob.core.windows.net/?${sasToken}`,
  )

  const containerClient = blobService.getContainerClient(container)
  await containerClient.createIfNotExists({ access: 'container' })

  const blobClient = containerClient.getBlockBlobClient(
    fileName + `.${fileType}`,
  )
  const options = { blobHTTPHeader: { blobContentType: fileType } }

  await blobClient.uploadBrowserData(file, options)
}
