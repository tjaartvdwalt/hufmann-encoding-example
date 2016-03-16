var $ = require('jquery')
var HuffmanEncoder = require('./huffman_encoder')

window.onload = pageLoad

// called when page loads; sets up event handlers
function pageLoad () {
  console.log('page load')
  $('#huffman-button')[0].onclick = okayClick
  $('#reset')[0].onclick = reset
}

function okayClick () {
  encode()
}

function encode () {
  // var s = "this is an example for huffman encoding"

  var s = $('#huffman-text-area')[0].value
  console.log(s)
  var huff = new HuffmanEncoder(s)
  // console.log(huff.inspect_color_encoding())
  $('#huffman-table').replaceWith(huff.inspect_color_encoding())
  $('#huffman-encoded').replaceWith('<div id="huffman-encoded">' + huff.color_encoded_string + '</div>')
}

// clear the data
function reset () {
  $('#huffman-text-area').val('')
  $('#huffman-table').html('')
  $('#huffman-encoded').html('')
}
