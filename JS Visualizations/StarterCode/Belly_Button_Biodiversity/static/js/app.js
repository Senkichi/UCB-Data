function buildMetadata(sample) {

    var url = `/metadata/${sample}`

    ds.json.(url)
      .then(function(response) {
        var sample_data = d3.select(('#sample-metadata'))

      sample_data.html('')
      var data = Object.entries(response)
      data.forEach(function ([key, value]) {
      sampleData.append('div').text(`${key}: ${value}`)
    })
      })

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  var url = `samples/${sample}`

  d3.json(url).then(function (response){
    console.log(response);

  trace1 = {
    x: response.otu_ids,
    y: response.sample_values,
    text: response.otu_labels,
    mode: 'markers',
    marker: {
      size: response.sample_values,
      color: response.otu_ids
    }
  }

  var data = [trace1];

  var layout = {
    showlegend: false,
    height: 600,
    width: 1200
  };

  Plotly.newPlot('bubble', data, layout);

})

  d3.json(url).then(function (response){
    let first_ten_otu_ids = response.otu_ids.slice(0, 10);
    let first_ten_otu_labels = response.otu_labels.slice(0, 10);
    let first_ten_sample_values = response.sample_values.slice(0, 10);

  var trace2 = {
    values: first_ten_sample_values,
    labels: first_ten_otu_ids,
    hovertext: first_ten_otu_labels,
    type: 'pie'
    };

  var data2 = [trace2];

  Plotly.newPlot('pie', data2)

  })
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
