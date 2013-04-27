When(/^I drag to the (\d*)(?:st|nd|rd|th)? page in "(.*?)"$/) do |page, class_name|
  selector = "view:'#{class_name}'"
  page.to_i.times do |i|
    scroll_view_to_position(selector, i * 320, 0)
    wait_for_nothing_to_be_animating
  end
  wait_for_nothing_to_be_animating
end
