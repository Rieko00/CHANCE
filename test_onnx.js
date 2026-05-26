const ort = require('onnxruntime-node');

async function main() {
  try {
    const session = await ort.InferenceSession.create('e:/Data LIDC/Riset/Deploy/CXR-Lung-Cancer-Detection/best.onnx');
    console.log('Input names:', session.inputNames);
    console.log('Output names:', session.outputNames);
    
    // We can't directly see the shapes without running it or using a parser, 
    // but we can feed dummy data to get the output shape.
    const inputName = session.inputNames[0];
    const dummy = new ort.Tensor('float32', new Float32Array(1 * 3 * 640 * 640), [1, 3, 640, 640]);
    const feeds = {};
    feeds[inputName] = dummy;
    
    const results = await session.run(feeds);
    const outputName = session.outputNames[0];
    const output = results[outputName];
    
    console.log('Output dims:', output.dims);
    console.log('First anchor cx, cy, w, h, conf:', output.data[0], output.data[1], output.data[2], output.data[3], output.data[4]);
  } catch (e) {
    console.error(e);
  }
}
main();
