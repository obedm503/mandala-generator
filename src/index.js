// @ts-check

function graphBounds(n) {
  const abs = Math.abs(n);
  return `\\left\\{ ${-1 * abs * 1.618} < x < ${abs * 1.618} \\right\\}`;
}

function randomColor() {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(2, 8)
      .toUpperCase()
  );
}
function randomNumbers(range, amount) {
  return Array(amount)
    .fill('')
    .map(() => range * (Math.random() * 2 - 1))
    .filter(num => num !== 0 && !Number.isNaN(num))
    .map(num => Number(num.toFixed(4)));
}
function lines(numbers, max) {
  return numbers.map(num => {
    const bounds = graphBounds(max);
    return `y=${num}(x+${num}${bounds.replace('x', 'y')}${bounds})`;
  });
}
function curves(numbers, max) {
  return numbers.reduce((arr, n) => {
    const oppositeN = n * -1;
    const abs = Math.abs(n);
    const bounds = graphBounds(max);
    const yBounds = bounds.replace('x', 'y');

    arr.push(
      `f_{${Math.floor(abs)}}=-\\left(\\frac{x^2}{${n}}+${n *
        -1}\\right)${bounds.replace('x', `f_${Math.floor(abs)}`)}${bounds}`,
    );
    arr.push(`y=\\frac{x^2}{${n}}+${oppositeN}${yBounds}${bounds}`);
    arr.push(
      `x=-\\left(\\frac{y^2}{${n}}+${oppositeN}\\right)${yBounds}${bounds}`,
    );
    arr.push(`x=\\frac{y^2}{${n}}+${oppositeN}${yBounds}${bounds}`);
    return arr;
  }, []);
}
function derivative(numbers, max) {
  return numbers.reduce((arr, n) => {
    const bounds = graphBounds(max);
    const yBounds = bounds.replace('x', 'y');
    arr.push(`y=x^{${n}}${yBounds}${bounds}`);
    arr.push(`y=${n}x^{${n - 1}}${yBounds}${bounds}`);
    return arr;
  }, []);
}
function circles(numbers) {
  return numbers.map(n => `r=${n}`);
}
function flowers(numbers) {
  return numbers.reduce((arr, n) => {
    arr.push(`r=${n}\\cos${n}\\theta`);
    arr.push(`r=${n * -1}\\cos${n}\\theta`);
    arr.push(`r=${n}\\cos${n / 10}\\pi\\theta`);
    return arr;
  }, []);
}
function integrals(numbers) {
  return numbers.map(n => {
    const abs = Math.abs(n);
    return `y=\\int_{${abs * -1}}^{${abs}}f_{${Math.floor(abs)}}dx`;
  });
}

let calculator;
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  calculator = Desmos.GraphingCalculator(
    document.getElementById('calculator'),
    {
      keypad: false,
      expressionsCollapsed: true,
      // polarMode: true
    },
  );
  // calculator.setState({"version":3,"graph":{"showGrid":true,"showXAxis":false,"showYAxis":false,"xAxisStep":0,"yAxisStep":0,"xAxisMinorSubdivisions":0,"yAxisMinorSubdivisions":0,"xAxisArrowMode":"NONE","yAxisArrowMode":"NONE","xAxisLabel":"","yAxisLabel":"","xAxisNumbers":false,"yAxisNumbers":false,"polarMode":true,"polarNumbers":false,"degreeMode":true,"projectorMode":false,"squareAxes":true,"viewport":{"xmin":-10,"ymin":-8.527027027027028,"xmax":10,"ymax":8.527027027027028}},"expressions":{"list":[{"id":"47","type":"expression","latex":"t=-0.0333","domain":{"min":"0","max":"1"},"label":"","hidden":true,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false,"sliderMin":"-.5","sliderMax":"0.5","sliderHardMin":true,"sliderHardMax":true,"sliderInterval":"","sliderAnimationPeriod":8000,"sliderLoopMode":"LOOP_FORWARD_REVERSE","sliderPlayDirection":1,"sliderIsPlaying":false},{"id":"20","type":"expression","latex":"y=t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"22","type":"expression","latex":"y=-t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"27","type":"expression","latex":"x=t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"28","type":"expression","latex":"x=-t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"19","type":"expression","latex":"r=t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"30","type":"expression","latex":"r=-t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"32","type":"expression","latex":"r=20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#000000","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"33","type":"expression","latex":"r=-20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"34","type":"expression","latex":"r=-\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"39","type":"expression","latex":"r=\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"dotted","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"42","type":"expression","latex":"r=t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"43","type":"expression","latex":"r=-t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false}]}})
});

window['mandala'] = {
  graph() {
    // @ts-ignore
    const range = parseFloat(document.getElementById('range').value);
    // @ts-ignore
    const amount = parseInt(document.getElementById('amount').value, 10);

    calculator.setBlank();
    // range + 1 to alevitate Math.random's inability to produce 1
    // Math.random has a range of [0,1)
    const numbers = randomNumbers(range + 1, amount);
    const largest = Math.max(...numbers);
    // numbers = [3];
    const expressions = [
      ...lines(numbers, largest),
      ...curves(numbers, largest),
      ...derivative(numbers, largest),
      ...circles(numbers),
      ...flowers(numbers),
      ...integrals(numbers),
    ];
    expressions
      .filter((ex, i, arr) => arr.indexOf(ex) === i)
      .forEach(exp =>
        calculator.setExpression({
          latex: exp,
          color: randomColor(),
        }),
      );

    // interesting relationship between circle radius and spike tips
    // multiplying the radius by  809/500 or 1.618 gives the coordinates
    // for the intersection point between the curves that form the spikes
    // + 0.5 adds some padding so that the intersection is not at the edge
    // of the graph
    // phi = 1.618
    let max = (largest + 0.5) * 1.618;
    let min = max * -1;
    // graph's height and width
    const { clientHeight, clientWidth } = document.getElementById('calculator');
    const ratio = clientWidth / clientHeight;
    // multiplying the domain by the ratio prevents the circles from appearing
    // as ovals, essentially makes the graph's "aspect ratio" 1:1
    min = min > 0 ? min * -1 : min;
    max = max < 0 ? max * -1 : max;
    calculator.setMathBounds({
      left: min * ratio,
      right: max * ratio,
      bottom: min,
      top: max,
    });
  },
  screenshot() {
    const screenshot = calculator.screenshot();
    const a = document.createElement('a');
    a.href = screenshot;
    a.download = 'random-mandala';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
};
