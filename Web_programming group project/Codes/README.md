# Web_programming group project

Web Programming Group Project


This application is for a website 'Tech Gizmo'.
Programmed by:
Arianna Warren 2304658
Jhakeim Thoms 2110121
Richard Thompson 2102437

The Programme:

User Experience explained:

Registration:
User creates an account using Name, username, password, trn, gender and date of birth (which is used to calculate the age of user so their age is added to the stats on the dashboard charts)

login:
User enters Trn and password to access account.
In the case that the credential doesn't match the ones inputed on registering will result in an error message displayed with after 2 more attempts.


Once user is logged in successfully, they are navigated to the Products page. 

All the oroducts within the product listing have descriptions, prices and add to cart buttons.
When the add to cart button is pressed, the item is added to the users cart along with its price and quantity.

The user has access to view their cart from the cart button in the top right hand corner of the webpage.
The cart displays the item name, price, sub-total, tax amount and grand total; the user then confirms the checkout by pressing the displayed button or the cancel button at the button of page.

The 'Check Out' button directs the user to a checkout page where they input their name, address and amount paid etc, afterwards they confirm their purchase.

The confirmation will send the user their invoice where their information and the shipping company's information will be displayed, along with the item name, price, tax and total; a email of the invoice is then mailed to the user/customer. 

User is then navigated back to the product page. 



Dashboard button is displayed at the top right of Invoice page which navigated to the Dashboard page:
Once on the dashboard, they would be able to view the user frequency which includes:

1. How many registered users fall under specific gender categories (e.g. Male, Female, Other)
2. Registered users under different age groups (18-25, 26-35, 36-50, 50+)
This is displayed in the format of bargraphs. Along with gender in format of a piechart
Tool Used: Chart.js
