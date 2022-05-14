import axios from "axios"

export default axios.create({
    // baseURL: "https://eu-central-1.aws.data.mongodb-api.com/app/student-demo-izdqw/endpoint/",
    baseURL: "http://localhost:5000/api/v1/",
    headers: {
        "Content-type": "application/json"
    }
})