Feature: 
  As an iOS developer
  I want to drill down to the view of interest
  So that I can evaluate LXPagingView

Scenario: 
  Navigate the app to evaluate LXPagingView
Given I launch the app
Then I wait to see a navigation bar titled "Listing"

When I touch the table cell marked "Normal Paging View"
Then I wait to see a navigation bar titled "PagingView"
Then I should see an element of class "PagingView"
When I drag to the 3rd page in "PagingView"
Then I should see "2"
Then I navigate back
