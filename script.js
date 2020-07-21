// selectors
const input = document.getElementById('number-input');
const output = document.getElementById('zip-output');

// get info
const getInfo = async e => {
  e.preventDefault();
  const zip = input.value;

  // fetch data
  const res = await fetch(`http://api.zippopotam.us/PH/${zip}`);
  const data = await res.json();

  // validation
  if (res.status !== 200) {
    output.innerHTML = '<article id="invalid">Invalid zip code</article>'
  } else {
    const {
      'place name': place,
      longitude: long,
      latitude: lat
    } = data.places[0];

    // output to dom
    output.innerHTML = `
    <article id="output">
    <h4>Location Info</h4>
    <div id="output-body">
    <p><strong>Place: </strong>${place}</p>
    <small><strong>long: </strong> <span class="values">${long}</span></small>
    <small><strong>lat: </strong> <span class="values">${lat}</span></small>
    </div>
    </article>
    `;
  }
}

// reset output
const resetOutput = () => {
  output.innerHTML = '';
  input.value = '';
}

// event listeners
document.getElementById('zip-form').addEventListener('submit', getInfo);
document.getElementById('reload').addEventListener('click', resetOutput);