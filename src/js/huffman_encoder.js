var BinaryHeap = require('binaryheap')

function generateRandomColor () {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function HuffmanEncoder (str) {
  this.str = str

  var count_chars = {}
  for (var j = 0; j < str.length; j++) {
    if (str[j] in count_chars) {
      count_chars[str[j]]++
    } else {
      count_chars[str[j]] = 1
    }
  }

  var pq = new BinaryHeap(function (x) {
    return x[0]
  })
  for (var ch in count_chars)
    pq.insert([count_chars[ch], ch])

  while (pq.length > 1) {
    var pair1 = pq.pop()
    var pair2 = pq.pop()
    pq.insert([pair1[0] + pair2[0], [pair1[1], pair2[1]]])
  }

  var tree = pq.pop()
  this.color_encoding = {}
  this.encoding = {}
  this._generate_encoding(tree[1], '')

  this.encoded_string = ''
  this.color_encoded_string = ''
  for (var i = 0; i < this.str.length; i++) {
    this.encoded_string += this.encoding[str[i]]
    if (this.color_encoding[str[i]] == null) {
      this.color_encoding[str[i]] = '<div style=color:' + generateRandomColor() + ';font-family:monospace;display:inline>' + this.encoding[str[i]] + '</div>'
    }
    this.color_encoded_string += this.color_encoding[str[i]]
  }
}

HuffmanEncoder.prototype._generate_encoding = function (ary, prefix) {
  if (ary instanceof Array) {
    this._generate_encoding(ary[0], prefix + '0')
    this._generate_encoding(ary[1], prefix + '1')
  } else {
    this.encoding[ary] = prefix
  }
}

HuffmanEncoder.prototype.inspect_encoding = function () {
  var returnString = ''
  for (var ch in this.encoding) {
    returnString += "'" + ch + "': " + this.encoding[ch] + '<br>'
  }
  return returnString
}

HuffmanEncoder.prototype.inspect_color_encoding = function () {
  var returnString = "<table id='huffman-table'>"
  for (var ch in this.encoding) {
    returnString += '<tr>'
    returnString += "<td><div style=font-family:monospace;>'" + ch + "':</div></td><td> " + this.color_encoding[ch] + '</td>'
    returnString += '</tr>'
  }
  returnString += '</table>'
  return returnString
}

HuffmanEncoder.prototype.decode = function (encoded) {
  var rev_enc = {}
  for (var ch in this.encoding)
    rev_enc[this.encoding[ch]] = ch

  var decoded = ''
  var pos = 0
  while (pos < encoded.length) {
    var key = ''
    while (!(key in rev_enc)) {
      key += encoded[pos]
      pos++
    }
    decoded += rev_enc[key]
  }
  return decoded
}

module.exports = HuffmanEncoder
