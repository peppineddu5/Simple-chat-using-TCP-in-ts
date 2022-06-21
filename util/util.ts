const HOST = "127.0.0.1"
const PORT = 10000
const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export { HOST, PORT, sleep }