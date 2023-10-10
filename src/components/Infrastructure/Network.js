import axios from "axios";

export const httpMethod = {
    get: "get",
    post: "post",
    delete: "delete",
    put: "put",
}

const Network = async({ httpMethod, url, parameter = {} }) => {
    try {
        const response = await axios ({
            method: httpMethod,
            url: url,
            data: parameter
        }).catch((error) => {
            throw error
        })

        if (response.error) { throw response.error }
        if (response.data["Error"]) {
            throw new Error(response.data("Error"))
        }
        return response.data
    } catch(error) {
        throw Error(error)
    }
}

export default Network;