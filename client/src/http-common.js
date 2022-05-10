import axios from "axios"

export default axios.create({
    baseURL: "https://eu-central-1.aws.data.mongodb-api.com/app/student-demo-izdqw/endpoint/",
    headers: {
        "Content-type": "application/json"
    }
})