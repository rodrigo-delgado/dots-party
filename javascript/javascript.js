var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    radius = 55;

var circles = d3.range(324).map(function(i) {
  return {
    x: (i % 10) * (radius + 1) * 2,
    y: Math.floor(i / 30) * (radius + 1) * 2
  };
});
var soundEfx; // Sound Efx
var soundLoad = "./music/water.wav"; //Game Over sound efx

var simulation = d3.forceSimulation(circles)
    .force("collide", d3.forceCollide(radius + 3).iterations(1))
    .on("tick", drawCircles);
    soundEfx = document.getElementById("soundEfx");


d3.select(canvas)
    .call(d3.drag()
        .container(canvas)
        .subject(dragsubject)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

function drawCircles() {
  context.clearRect(0, 0, width, height);
  context.save();
  context.beginPath();
  circles.forEach(drawCircle);
  context.fill();
  context.fillStyle = "#52ED09";

  context.stroke();
}

function drawCircle(d) {

  context.moveTo(d.x - radius, d.y);
  context.arc(d.x, d.y, radius, 0, 2 * Math.PI);


}
function dragsubject() {
  return simulation.find(d3.event.x, d3.event.y, radius);
}

function dragstarted() {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
  document.getElementById("bounce").play();


}

function dragged() {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;

}

function dragended() {
  if (!d3.event.active) simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;
}
document.getElementById("water").play();
