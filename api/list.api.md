#### Example : (version) / (separator) / (actor) / { (Crud) / (purpose) || (purpose) }

> Note : end of the **purpose** should be singular.

## For owners :

> FETCH  ❌ 
1. /api/user/login  |POST|

> INSERT ❌
2. /api/user/register   |POST|
   
## For shops :

> INSERT ❌  
1. /api/shop/create     |POST| |✔|
2. /api/shop/create/product |POST| |✔|
3. /api/shop/create/sell  |POST|

> UPDATE ❌
5. /api/shop/update/product
6. /api/shop/update/sell

> DELETE ❌
7. /api/shop/delete/product
8. /api/shop/delete/sell

> FETCH ❌
9. /api/shop/products
10. /api/shop/sells
11. /api/shop/analytics
