const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let userDao = {
    createUser: createUser,
    getUser: getUser
}

async function createUser(user) {
    const newPassword = await bcrypt.hash(user.password, 10);
    user = {...user, password: newPassword};
    let newUser = new User(user);
    return newUser.save();
}
async function getUser(user) {
    const userInstance = await User.findOne({
		where: { username: user['username'] }
	})

	if (!user || !userInstance) {
		throw( "Wrong username or password." ); 
	}

	const isPasswordValid = await bcrypt.compare(
		user.password,
		userInstance?.password
	)
	if (isPasswordValid) {
		const token = jwt.sign(
			{
                id: userInstance.id,
				username: userInstance.username,
				email: userInstance.email,
			},
			`${process.env.SECRET}`
		)

		return { status: 'ok', user: token }
	} else {
		return { status: 'error', user: false }
	}
}
module.exports = userDao;
