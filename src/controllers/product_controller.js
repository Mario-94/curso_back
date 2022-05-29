const products = [
    {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020"
    },
    {
        "id": 2,
        "name": "fuchsia rose",
        "year": 2001,
        "color": "#C74375",
        "pantone_value": "17-2031"
    },
    {
        "id": 3,
        "name": "true red",
        "year": 2002,
        "color": "#BF1932",
        "pantone_value": "19-1664"
    },
    {
        "id": 4,
        "name": "aqua sky",
        "year": 2003,
        "color": "#7BC4C4",
        "pantone_value": "14-4811"
    },
    {
        "id": 5,
        "name": "tigerlily",
        "year": 2004,
        "color": "#E2583E",
        "pantone_value": "17-1456"
    },
    {
        "id": 6,
        "name": "blue turquoise",
        "year": 2005,
        "color": "#53B0AE",
        "pantone_value": "15-5217"
    },
    {
        "id": 7,
        "name": "blue turquoise",
        "year": 2005,
        "color": "#53B0AE",
        "pantone_value": "15-5217"
    }
];
//listado de productos
const getProducts = (req, res) => {
    const itemsPerPage = 6; //numero de elementos que se muestran en la paginacion
    const page = parseInt(req.query.page); // valor que resivimos por pagina
    const start = (page - 1) * itemsPerPage; //donde inicia la paginacion
    const total = products.length; //total de items
    const end = page * itemsPerPage; //final de la paginacion o elemento final
    res.send({
        "page": page,
        "per_page": itemsPerPage,
        "total": total,
        "total_pages": Math.ceil(total / itemsPerPage),
        "data": products.slice(start, end),
    })
}
//*******listado de productos por id ******
const getProductById = (req, res) => {
    const id = parseInt(req.params.productId);
    const result = products.findIndex((item) => item.id == id);

    if (result !== -1) {

        res.send({
            data: products[result]
        })
    } else {
        res.status(404).send({})
    }
}
// Creacion de nuevo producto, esto se haria en una pase de datos real pero por el momento todo esto se guarda en cache
const newProduct = (req, res) => {
    const {
        name,
        year,
        color,
        pantone_value
    } = req.body;
    const newProduct = {
        id: products.length + 1,
        name, //es igual a name:name, cuando suceda esto que el nombre de la constante que enviamos y recibimos es el mismo se pone el mismo nombre
        year,
        color,
        pantone_value,
    }
    products.push(newProduct);
    res.send(newProduct);
}
//update de producto en este caso este se utiliza para modificar todo el producto en si
const updateProduct = (req, res) => {
    const id = parseInt(req.params.productId);
    const {
        name,
        year,
        color,
        pantone_value
    } = req.body;
    const index = products.findIndex((item) => item.id = id);
    if (index !== -1) {
        products[index] = {
            id,
            name,
            year,
            color,
            pantone_value,
        }
        res.send({
            data: products[index]
        })
    } else {
        res.status(404).send({})
    }
}
// update parcial utilizando el meto de patch
const partialUpdateProduct = (req, res) => {
    const productId = parseInt(req.params.productId);
    const {
        id,
        name,
        year,
        color,
        pantone_value
    } = req.body; //recorcemos que req.body es para el envio de informacion por medio de url "?"
    const index = products.findIndex((item) => item.id = productId);
    if (index !== -1) {
        const product = products[index]; //esto es igual que products[index].id, esta constante se creo para eso
        products[index] = {
            id: id || product.id,
            name: name || product.name,
            year: year || product.year,
            color: color || product.color,
            pantone_value: pantone_value || product.pantone_value,
        }
        res.send({
            data: products[index]
        })
    } else {
        res.status(404).send({})
    }
}
//Esta es una peticion de tipo post, debido a que queremos agregar un nuevo valor que en este caso sera el email, y aparte modificar un valor de nuestos valores que tenemos, entonces no se puede usar ni put ni path.
const updateProductAndNotify = (req, res) => {
    const productId = parseInt(req.params.productId);
    const {
        client,
        data
    } = req.body;

    const {
        id,
        name,
        year,
        color,
        pantone_value
    } = data; //recorcemos que req.body es para el envio de informacion por medio de url "?"
    const index = products.findIndex((item) => item.id = productId);
    if (index !== -1) {
        const product = products[index]; //esto es igual que products[index].id, esta constante se creo para eso
        products[index] = {
            id: id || product.id,
            name: name || product.name,
            year: year || product.year,
            color: color || product.color,
            pantone_value: pantone_value || product.pantone_value,
        }
        res.send({
            data: products[index],
            message: `Email send to ${client}`
        })
    } else {
        res.status(404).send({})
    }
}
// Eliminacion de producto
const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.productId);
    const index = products.findIndex((item) => item.id == productId);
    if (index !== -1) {
        products.splice(index, 1);
        res.send({})
    } else {
        res.status(404).send({});
    }


}
module.exports = {
    getProducts,
    getProductById,
    newProduct,
    updateProduct,
    partialUpdateProduct,
    updateProductAndNotify,
    deleteProduct,
}