const usersController = require("../../controllers/user_controller");
const productsController = require("../../controllers/product_controller");
const createRoutesV1 = (app) => {
    app.get('/api/v1/users/', usersController.getUser);
    app.get('/api/v1/users/:userId', usersController.getUserById);
    app.get('/api/v1/products', productsController.getProducts); //Esta es la parte de la paginacion.
    app.get('/api/v1/products/:productId', productsController.getProductById); //peticion por id
    app.post('/api/v1/products/create', productsController.newProduct); //para crear un nuevo producto
    app.put('/api/v1/products/:productId', productsController.updateProduct); //para actualizar un producto en su totalidad
    app.patch('/api/v1/products/:productId', productsController.partialUpdateProduct); //actualizacion parcial, es decir no se actualiza todo el producto.
    app.post('/api/v1/products/:productId/notify-client', productsController.updateProductAndNotify); // Con este metodo agregamos un nuevo campo.
    app.delete('/api/v1/productsId/:productId', productsController.deleteProduct); //eliminamos por id
};
module.exports = createRoutesV1;