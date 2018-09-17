# Bamazon
Welcome to Bamazon a basic terminal/cli based shop app. Developed for node.js homework assignment for University of Richmond Coding Bootcamp.


## Customer portion

This portion of the Bamazon app is dedicated to the customer "shopping" experience. Here the customer sees the items in stock and can select one to purchase.


### Techs Used

- node.js- Javascript run time environment to allow use of Javascript outside of the browser
- console.table- an npm library that allows our console log of data to be presented in a user friendly table. 
- mysql- this app uses mysql running on the local host to store the inventory and save changes

### Still to do

- [] Allow selection of multiple items
- [] Create a true checkout section, prompt the user if they are done shopping after selecting quantity
- [] Shopping Cart


### App in motion

![alt text](/readmeimgs/bamazonhome.png)
#### The initial Screen and item selection.

![alt text](/readmeimgs/bamazonselect.png)
#### The User selects an item and is prompted to enter a quantity

![alt text](/readmeimgs/bamazoncheckout.png)
#### If the Quantity is valid the user is given the total and that total is removed from stock

![alt text](/readmeimgs/bamazonerr.png)
#### Here we see the updated total and the error and loop if the user enters more than in stock (note a seperate error pops if a number is not entered)







