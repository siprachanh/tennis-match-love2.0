//contains fetch calls to the API

const remoteURL = "http://localhost:8088"
export const getMatchDays = () => {
    return fetch(`${remoteURL}/matchDay?`)
    .then(res => res.json())
}


// const remoteURL = "http://localhost:8088"
// export const getMatchDays = () => {
//     return fetch(`${remoteURL}/matchDay?`)
//     .then(res => res.json())
// }

