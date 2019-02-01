// from data.js
var tableData = data;

function create_table(data) {
  var table = d3.select('#ufo-table')
  var body = table.select('tbody')
    for (var i = 0; i < data.length; i++) {
      trow = body.append('tr')
      trow.append('td').text(data[i].datetime)
      trow.append('td').text(data[i].city)
      trow.append('td').text(data[i].state)
      trow.append('td').text(data[i].country)
      trow.append('td').text(data[i].shape)
      trow.append('td').text(data[i].durationMinutes)
      trow.append('td').text(data[i].comments)
    }
};

create_table(tableData);

var submit = d3.select('#filter-btn')
submit.on('click', function() {

  d3.event.preventDefault()

  var input_element = d3.select('#datetime')
  var input_value = input_element.property('value')
  var table = d3.select('#ufo-table')
  var body = table.select('tbody')
  var filtered_data = tableData.filter(sighting => sighting.datetime === input_value)
  body.html('') 
  for (i = 0; i < filtered_data.length; i++) {
    if (input_value === filtered_data[i].datetime) {
        trow = body.append('tr')
        trow.append('td').text(filtered_data[i].datetime)
        trow.append('td').text(filtered_data[i].city)
        trow.append('td').text(filtered_data[i].state)
        trow.append('td').text(filtered_data[i].country)
        trow.append('td').text(filtered_data[i].shape)
        trow.append('td').text(filtered_data[i].durationMinutes)
        trow.append('td').text(filtered_data[i].comments)
      }
  }



})
