const uri = {
    type: "string",
    format: "uri",
    maxLength: 256
}

module.exports = {
    secret: "supersecretpassword",
    port: process.env.PORT || 3000,
    profileSchema: {
        type: "object",
        properties: {
            facebook: uri,
            vk: uri,
            github: uri,
            linkedIn: uri,
            twitter: uri,
            aboutMe: { type: "string", maxLength: 2048 }
        },
        additionalProperties: false
    }
}