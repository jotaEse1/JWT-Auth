const sendRefreshToken = (res, token) => {
    res.cookie('refreshtoken', token, {httpOnly: true})
}

const sendAccessToken = (res, email, token) => {
    res.send({token, email})
}

module.exports = {sendAccessToken, sendRefreshToken}
