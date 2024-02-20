
var Block = require('../uglymol').Block;

describe('isosurface', () => {
  'use strict';

  function sq(a) { return a * a; }
  function dist(a, b) {
    return Math.sqrt(sq(a[0]-b[0]), sq(a[1]-b[1]), sq(a[2]-b[2]));
  }
  var dims = [11, 11, 11];
  var ctr = [5.1, 6, 6.2];
  var points = [];
  var values = [];
  for (var x = 0; x < dims[0]; x++) {
    for (var y = 0; y < dims[1]; y++) {
      for (var z = 0; z < dims[2]; z++) {
        var point = [x + 0.2 * y, y - 0.2, 1.3 * z];
        points.push(point);
        values.push(dist(point, ctr));
      }
    }
  }
  const block = new Block();
  block.set(points, values, dims);
  it('sphere', () => {
    var isolevel = 3;
    var ret = block.isosurface(isolevel);
    expect(ret.vertices.length).toBeGreaterThan(100*3); // way above
    for (var i = 0; i < ret.vertices.length; i += 3) {
      var vertex = ret.vertices.slice(i, i+3);
      var d = dist(vertex, ctr);
      expect(Math.abs(d - isolevel)).toBeLessThanOrEqual(1e-6);
    }
  });
});

