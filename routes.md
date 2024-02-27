login.ejs

B GET NULL
R GET ??? /users/:email ??? /users/:user_id ???
E POST NULL
A POST NULL
D POST NULL

index.ejs

B GET /organizations
R GET /organizations/:organization_id
E POST NULL
A POST NULL
D POST NULL

new-account.ejs

B GET NULL
R GET NULL
E POST NULL
A POST /accounts
D POST NULL

update-account.ejs

B GET NULL
R GET /accounts/:account_id
E POST /accounts/:account_id
A POST NULL
D POST NULL

users.ejs

B GET NULL
R GET NULL
E POST NULL
A POST /users/
D POST NULL

*** widgets (drop down triangle) ***

B GET /categories
R GET /categories/:category_id
E POST NULL
A POST NULL
D POST NULL