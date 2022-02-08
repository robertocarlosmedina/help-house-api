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

router.get('/single_service', express.json(), async (req, res) => {

	const { id } = req.body;
	const service = await HelpHouse.get_services(id)

	if (service.length < 1){
		return res.sendStatus(404)
	}
	if (!service) return res.sendStatus(404) // internal error
	return res.json({
        description: service[0].description,	
		data: service[0].data,
		horas: service[0].horas,
		id_prestador: service[0].id_prestador,
		id_requsitador: service[0].id_requsitador,
		id_categoria: service[0].id_categoria,
		status: service[0].status
    })
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
	const service = await HelpHouse.update_service_state(id, status)
	const update_service = await HelpHouse.get_services(id)

	if (!service) return res.sendStatus(500) // internal error
	return res.json(
	    {
			description: update_service[0].description,	
			data: update_service[0].data,
			horas: update_service[0].horas,
			id_prestador: update_service[0].id_prestador,
			id_requsitador: update_service[0].id_requsitador,
			id_categoria: update_service[0].id_categoria,
			status: update_service[0].status
		}
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
