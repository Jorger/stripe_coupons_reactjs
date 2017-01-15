# Stripe Coupons Reactjs 

Actividad desarrollada haciendo uso de ReactJS, consumiendo la [API de stripe] para obtener cupones.

### Demo

![STRIPE](https://raw.githubusercontent.com/Jorger/stripe_coupons_reactjs/master/imagesreadme/StripeVideo.gif)

URL: https://mysterious-harbor-14114.herokuapp.com

### Servicios.

Método|URI|Acción
:--:|:--:|:--:|:--:|:--:|:--:
**POST**|/register|Registrar un nuevo usuario|
**POST**|/login|Autenticar un usuario|
**GET**|/coupons/:page|Obtener el listado de cupones disponibles|
**GET**|/getcoupon/:id|Obtener un cupón dado el id del mismo|
**POST**|/newcoupon|Crear un cupón|
**PUT**|/updatecoupon/|Actualiza un cupón|
**DELETE**|/deletecoupon/:id|Elimina un cupón|

### Variables de Entorno.

Se han definido 4 variables de entorno como son:

```
MONGO_DB=url_puerto_mongo
MONGO_USER=usuario_mongo
MONGO_PASS=clave_mongo
STRIPE_ID=token_stripe
```

### Cliente

```
cd client
npm install
npm start
```

### Server

El servidor ya cuenta con el [build] resultante del cliente

```
cd server
npm install
node app.js
```

### Autor
Jorge Rubaino [@ostjh]
License
----
MIT

[@ostjh]:https://twitter.com/ostjh
[API de stripe]:https://stripe.com/docs/api
[build]:https://github.com/Jorger/stripe_coupons_reactjs/tree/master/server/build
