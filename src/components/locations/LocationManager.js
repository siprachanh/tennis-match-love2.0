const remoteURL = "http://http://localhost:8088/invites?_expand=courtLocationId"

export const getAllLocations = () => {
    return fetch(`${remoteURL}`)
    .then(res => res.json())
  }

  export const deleteLocation = (id) => {
    return fetch(`${remoteURL}${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  }

  export const getLocationById = (locationId) => {
    return fetch(`${remoteURL}${locationId}`)
    .then(res => res.json())
  }