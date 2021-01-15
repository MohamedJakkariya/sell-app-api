#### Example : (version) / (separator) / (actor) / { (Crud) / (purpose) || (purpose) }

> Note : end of the **purpose** should be singular.

## For owners :

> FETCH ❌

1. /api/user/login |POST|

> INSERT ❌ 2. /api/user/register |POST|

## For shops :

> INSERT 💹

1. /api/shop/create |POST| |✔|
2. /api/shop/create/product |POST| |✔|
3. /api/shop/create/sell |POST| |✔|

> UPDATE 💹

1. /api/shop/update |✔|
2. /api/shop/update/product |✔|
3. /api/shop/update/sell |✔|
4. /api/shop/update/address |✔|

> DELETE 💹

1. /api/shop/delete |✔|
2. /api/shop/delete/address |✔|
3. /api/shop/delete/product |✔|
4. /api/shop/delete/sell |✔|

> FETCH ❌

1. /api/shop/products
2. /api/shop/sells
3. /api/shop/analytics
