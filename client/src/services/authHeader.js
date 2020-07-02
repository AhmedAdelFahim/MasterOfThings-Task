const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.sessionId) {
        return {'session-id': user.sessionId}
    }
    return {}
}
export default authHeader
