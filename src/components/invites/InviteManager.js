//contains fetch calls to the API

const remoteURL = "http://localhost:8088"
export const getMatchDays = () => {
    return fetch(`${remoteURL}/matchDay?`)
    .then(res => res.json())
}



export const getCourtLocations = () => {
    return fetch(`${remoteURL}/courtLocation?`)
    .then(res => res.json())
}
  // const handleCourtLocations = () => {
  //     fetch(("http://http://localhost:8088/invites?_expand=courtLocationId" )
  //     .then(data => data.json())
  //     .then( courtLocations => selectCourtLocations(courtLocations))
  //     )};

export const getCourtNames = () => {
    return fetch(`${remoteURL}/courtName?`)
    .then(res => res.json())
}


export const getAllHomeStatus = () => {
    return fetch(`${remoteURL}/homeStatus?`)
    .then(res => res.json())
}

// export const getMatchTime = () => {
//     return fetch(`${remoteURL}/matchDay?`)
//     .then(res => res.json())
// }