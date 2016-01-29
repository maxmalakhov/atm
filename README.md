# atm
Cash Machine

There are 3 views:
 
1. The first view is loaded when the application starts. The user can enter his card number and pin-code.
The card number field should accept only numbers.
The pin code field cannot be filled in manually. Upon receiving focus a virtual keyboard with numbers should appear, where the user can enter the code using their mouse.
Entered values should be validated. If they are correct then the user is redirected to the next view. Otherwise we should show them an error.
 
2. The second view shows general information about the cardholder and their card balance.
There should be two buttons (Exit and Get Cash).
When the user clicks “Exit”, they should be redirected to the first view.
When the user clicks “Get Cash”, they should be redirected to the third view.
 
3. On the third view there should be an input field where the user can enter the amount of cash they want to receive.
Also, on the bottom of the screen there should be 2 buttons (Cancel and Get Cash).
When the user clicks “Cancel”, they should be redirected to the second view.
When the user clicks “Get Cash”, we should validate that they have enough money on their account.
If there is enough we should “give them the cash” and decrease the amount on their account.
If not we should show an error.
After a successful withdrawal we should redirect the user to the second view, where updated information should be displayed.
