const jwt = require('jsonwebtoken');
const {secretKey,expiresIn} = require('../config/cinfig');

exports.generateToken = function(uid,scoped){/* scoped：权限 */
    const token = jwt.sign(
        {
            uid,
            scoped
        },
        secretKey,
        {
            expiresIn
        }
    );
    return token;
};

