import { Router } from 'express'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/updateDeliverymanController'
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController'
import { FindAllDeliveriesDeliverymanController } from './modules/deliveries/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController'
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController'

const routes = Router()

const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createClientController = new CreateClientController()
const createDeliveryController = new CreateDeliveryController()
const createDeliverymanController = new CreateDeliverymanController()
const findAllAvailableController = new FindAllAvailableController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdateEndDateController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.post('/client', createClientController.handle)
routes.get('/client/deliveries', findAllDeliveriesController.handle)
routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)
routes.put('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.get('/delivery/available', ensureAuthenticateClient, findAllAvailableController.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)
routes.put('/delivery/updateEndDate/:id', updateEndDateController.handle)

export { routes }
