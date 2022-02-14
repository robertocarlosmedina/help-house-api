const express = require('express');
const router = express.Router()
router.use(express.json());

const HelpHouse = require('../db/helpHouse')


/**
 * Arrow Function that return the number o bus on a route
 *  @param all_bus
 *  @param id_route
 *  @return The route name
 * */ 
 const getNrBusesONRoute = (all_bus, id_route) => {
    const buses_on_route = all_bus.filter( (bus) =>{
        return bus.id_route === id_route && bus.state
    })
    return buses_on_route.length
}

router.get('/', express.json(), async (req, res) => {
	const all_services = await HelpHouse.get_services()

	if (!all_services) return res.sendStatus(500) // internal error

	return res.json(
	    {
			services: all_services.map((service) => ({
				description: service.description,	
				data: service.data,
				horas: service.horas,
				id_prestador: service.id_prestador,
				id_requsitador: service.id_requsitador,
				id_categoria: service.id_categoria,
				status: service.status
			}))
		}
	)
});

router.get('/category', express.json(), async (req, res) => {
	const all_category = await HelpHouse.get_services_category()

	if (!all_category) return res.sendStatus(500) // internal error
	return res.json(
	    {
			category: all_category.map((category) => ({
				id: category.id,
				name: category.name,
				description: category.description
			}))
		}
	)
});

router.post('/single_service', express.json(), async (req, res) => {

	const { id } = req.body;
	const services = await HelpHouse.get_services(id)

	if (!services) return res.sendStatus(404) // internal error

	return res.json(
		{
			servicos: 
				services.map((service) => ({
				id: service.id,
        		description: service.description,	
				data: service.data,
				horas: service.horas,
				id_prestador: service.id_prestador,
				id_requsitador: service.id_requsitador,
				id_categoria: service.id_categoria,
				status: service.status
			}))
		}
	) 
});


router.get('/single_category', express.json(), async (req, res) => {
	const { id } = req.body;
	const category = await HelpHouse.get_services_category(id)

	if (!category) return res.sendStatus(500) // internal error
	return res.json(
	    {
			id: category[0].id,
			name: category[0].name,
			description: category[0].description
		}
	)
});

router.post('/create', express.json(), async (req, res) => {

	const { description, data, horas, id_prestador, id_requsitador, id_categoria } = req.body;
	const new_service_request = await HelpHouse.post_service(description, data, horas, id_prestador,
		 id_requsitador, id_categoria);
	const all_service_request = await HelpHouse.get_services()
	const last_service = all_service_request[all_service_request.length-1]

	if(!new_service_request) return res.sendStatus(500);
	
	return res.json(last_service)
});

router.post('/create/category', express.json(), async (req, res) => {

	const { name, description } = req.body;
	const new_service_category = await HelpHouse.post_service_category(name, description);
	const all_service_category = await HelpHouse.get_services_category()
	const last_category = all_service_category[all_service_category.length-1]

	if(!new_service_category) return res.sendStatus(500);
	
	return res.json(last_category)
});

router.post('/change_state', express.json(), async (req, res) => {
	const { id, status } = req.body;
	console.log(id, status)
	const service = await HelpHouse.update_service_state(id, status==1 ? true: false)

	if (!service) return res.sendStatus(500) // internal error
	return res.sendStatus(200);
});

router.post('/add_user_category', express.json(), async (req, res) => {
	const { id_user, id_category } = req.body;
	const user_category = await HelpHouse.add_category_user(id_user, id_category)
	const users_categorys = await HelpHouse.get_user_categorys()
	const last_category = users_categorys[users_categorys.length-1]

	if (!user_category) return res.sendStatus(500) // internal error
	return res.json(
	    last_category
	)
});


router.post('/delete', express.json(), async (req, res) => {
	const { id } = res.body;
	const deletedClass = await HelpHouse.delete_service(id)

	if (!deletedClass) return res.sendStatus(404) //  internal error
	return res.sendStatus(200)
});

router.delete('/cotegory/delete/', express.json(), async (req, res) => {
	const { id } = res.body;
	const coordinate = await HelpHouse.delete_service_category(id)

	if (!coordinate) return res.sendStatus(404) // internal error
	return res.sendStatus(200)
});

module.exports = router
