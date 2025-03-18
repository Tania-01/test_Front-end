const baseURL = 'http://localhost:3000'
const task='/task'
const auth='/auth'
const urls = {
    auth:{
        signUp:`${auth}/register`,
        signIn:`${auth}/login`,

    },
    task:{
        task:"/"
    }

}

export {
    baseURL,
    urls
}