const express = require('express');
const { delete_busInfo } = require('../db/helpHouse');
const router = express.Router()
router.use(express.json());


const HelpHouse = require('../db/helpHouse')


const checkIfUserAlreadyExist = (username, user_email, all_users) => {
    const related_user = all_users.filter( (user) =>{
        return user.name === username || user.email === user_email
    })
	if(related_user.length > 0){
		return true;
	}
    return false
}

/**
 * Arrow Function that filter all routes and retunr the route name
 *  @param username
 *  @param user_email
 * 	@param all_users
 *  @return The route name
 * */ 
 const getCategoryWithID = (id, all_category) => {
    const related_category = all_category.filter( (category) =>{
        return category.id = id
    })
	
	return related_category[0].name
}

router.get('/', express.json(), async (req, res) => {
	const users = await HelpHouse.get_users()

	if (!users) return res.sendStatus(500) // internal error
	return res.json(
	    users.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email, 
            userphone: user.userphone, 
			price: user.price,
			longitude: user.longitude,
			latitude: user.latitude
		}))
	) 
});

router.get('/get_a_user', express.json(), async (req, res) => {

	const { id } = req.body;
	const user = await HelpHouse.get_users(id)

	if (!user || user.length < 1) return res.sendStatus(404) // internal error

	return res.json({
        id: user[0].id,
        username: user[0].username,
        email: user[0].email, 
        userphone: user[0].userphone, 
        password: user[0].hash_password,
		price: user[0].price,
		longitude: user[0].longitude,
		latitude: user[0].latitude
    })

});

router.get('/get_user_info', express.json(), async (req, res) => {

	const { id } = req.body;
	const user = await HelpHouse.get_users(id)

	if (!user  || user.length < 1) return res.sendStatus(404) // internal error
	return res.json({
        username: user[0].username,
        email: user[0].email, 
        userphone: user[0].userphone, 
		price: user[0].price,
		longitude: user[0].longitude,
		latitude: user[0].latitude
    })

});

router.post('/create', express.json(), async (req, res) => {
	const { email, username, userphone, hash_password, price, longitude, latitude, userType } = req.body;
	const all_users = await HelpHouse.get_users()
	const userAlredyExit = checkIfUserAlreadyExist(username, email, all_users)

	if(userAlredyExit){
		return res.sendStatus(401)
	}

	const new_user = await HelpHouse.post_user(email, username, userphone, hash_password, price, longitude, latitude, userType);
	const updated_all_users = await HelpHouse.get_users()

	const last_user = updated_all_users[updated_all_users.length-1]

	if(!new_user) return res.sendStatus(500);
	
	return res.json(last_user)
});

router.post('/auth', express.json(), async (req, res) => {

	const { email_or_username, password } = req.body;
	const all_users = await HelpHouse.get_users();

	if(!all_users) return res.sendStatus(500);


	const authenticated_user = all_users.filter((user) =>{
        return (user.username == email_or_username || user.email == email_or_username) && user.hash_password == password
    })
	if (authenticated_user.length > 0){
		return res.json(authenticated_user[0])
	}
	else{
		return res.sendStatus(401);
	}
});

router.post('/get_all_related_prestador', express.json(), async (req, res) => {
	const { id_category } = req.body;
	const related_user_category = await HelpHouse.get_user_categorys(id_category);

	if(!related_user_category) return res.sendStatus(500);

	return res.json(
	    {
			prestadores: 
				related_user_category.map((user) => ({
            	username: user.username,
				email: user.email,
				userphone: user.userphone,
				price: user.price,
				id: user.id
			}))
		}
	) 
});

router.post('/contact_price_info', express.json(), async (req, res) => {

	const { id, userphone, price } = req.body;
	const all_users = await HelpHouse.edit_user_contact_price(id, userphone, price);

	if(!all_users) return res.sendStatus(500);

	res.sendStatus(200);
});

router.put('/edit', express.json(), async (req, res) => {
	
	const { id, password } = req.body;
	const edited_user = await HelpHouse.edit_user(id, password);
	const user_data = await HelpHouse.get_users(id)

	if(!edited_user) return res.sendStatus(500);
	if(!user_data) return res.sendStatus(500);
	
	return res.json(user_data[0]);
});

router.post('/delete', express.json(), async (req, res) => {
	const { id } = req.body;
	const deletedClass = await HelpHouse.delete_user(id)

	console.log(deletedClass)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.sendStatus(200)
});

module.exports = router
