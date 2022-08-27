import { fabric } from 'fabric';
function setupCanvas(wWidth, wHeight) {
  //пк или моб?
  wHeight < wWidth
    ? ((cHeight = wHeight - 150), (cWidth = cHeight * 0.812))
    : ((cWidth = wWidth), (cHeight = cWidth * 1.2341));
  // console.log(wWidth, wHeight);
  // console.log(cWidth, cHeight);
  canvas = new fabric.Canvas('canvas', {
    backgroundColor: '#fff',
    width: cWidth,
    height: cHeight,
  });
  setBg('white');
}
function resizeCanvas(wWidth, wHeight) {
  if (wHeight || wWidth) {
    wHeight < wWidth
      ? ((cHeight = wHeight - 200), (cWidth = cHeight * 0.812))
      : ((cWidth = wWidth * 0.8), (cHeight = cWidth * 1.2341));
    // console.log(wWidth, wHeight);
    // console.log(cWidth, cHeight);
    canvas.setHeight(cHeight);
    canvas.setWidth(cWidth);
    bgIMG.scale(cWidth / 440);
    canvas.renderAll();
  }
}
var canvas, cWidth, cHeight, bgIMG;
var deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

var img = document.createElement('img');
img.src = deleteIcon;

fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = 'blue';
fabric.Object.prototype.cornerStyle = 'circle';

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetX: -26,
  cursorStyle: 'pointer',
  mouseUpHandler: deleteObject,
  render: renderIcon,
  cornerSize: 24,
});

function deleteObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  var size = this.cornerSize;
  ctx.save();
  ctx.translate(left, top);
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}
function addImage(id) {
  let imgElement = document.getElementById(id);
  let img = new fabric.Image(imgElement, {
    left: 50,
    top: 50,
  });
  img.scaleToWidth(100);
  canvas.add(img);
  canvas.renderAll()
}

function addText() {
  let textbox = new fabric.IText('Т', {
    left: 50,
    top: 50,
    fontSize: 48,
    fill: '#e4002b',
    fontFamily: 'sans-serif',
  });
  canvas.add(textbox).setActiveObject(textbox);
}
function savePNG() {
  var dataURL = canvas.toDataURL('image/jpeg', 1.0);
  var a = document.createElement('a');
  a.href = dataURL;
  a.download = 'tshirt.jpg';
  document.body.appendChild(a);
  a.click();
}
function handleDrawing() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
}
function setBg(color) {
  new fabric.Image.fromURL(`./src/assets/blank.png`, function (img) {
    bgIMG = img;
    img.set({
      opacity: 1,
      selectable: false,
    });
    img.scale(canvas.getWidth() / 440);
    canvas.add(img);
  });
}
function setCanvasBG(color) {
  canvas.backgroundColor = color;
  canvas.renderAll();
}
function setFont(font) {
  try {
    canvas.getActiveObject().set({ fontFamily: font });
    setTimeout(() => canvas.renderAll(), 1000);
  } catch (e) {
    alert('Выберите тестовое поле');
  }
}
function setColor(color) {
  try {
    canvas.getActiveObject().set({ fill: color });
    canvas.renderAll();
  } catch (e) {
    alert('Выберите тестовое поле');
  }
}
function sendPNG() {
  var dataURL = canvas.toDataURL('image/jpeg', 1.0);
  return dataURL;
}
function addImageFromURL(link) {
  fabric.Image.fromURL(link, function (img) {
    img.set({ left: 50, top: 50 });
    img.scaleToWidth(200);
    canvas.add(img).renderAll().setActiveObject(img);
  }, { crossOrigin: 'Anonymous' });
}
export {
  setupCanvas,
  resizeCanvas,
  addText,
  addImage,
  savePNG,
  handleDrawing,
  setBg,
  setCanvasBG,
  setFont,
  setColor,
  sendPNG,
  addImageFromURL,
};
