window.mandala = (()=>{
  let calculator;
  function randomColor(){
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }
  function randomNumbers(range, amount){
    return Array(amount)
      .fill('')
      .map( () => Math.random() * 2 - 1  )
      .map( num => ( range * num ).toFixed(4) )
      .filter( num => num !== 0 && !isNaN(num) );
  }
  function lines(numbers){
    return numbers.map( num => `y=${num}(x+${num})` );
  }
  function curves(numbers){
    return numbers.reduce( ( arr, n ) => {
      let abs = Math.abs(n);
      arr.push(`f(x)=-\\left(\\frac{x^2}{${n}}+${n * -1}\\right)`);
      arr.push(`y=\\frac{x^2}{${n}}+${n * -1}`);
      arr.push(`x=-\\left(\\frac{y^2}{${n}}+${n * -1}\\right)`);
      arr.push(`x=\\frac{y^2}{${n}}+${n * -1}`);
      return arr;
    }, []);
  }
  function derivative(numbers){
    return numbers.reduce( ( arr, n ) => {
      n = (n * n)/n;
      arr.push(`y=x^{${n}}`);
      arr.push(`y=${n}x^{${n-1}}`);
      return arr;
    }, []);
  }
  function circles(numbers){
    return numbers.map( n => `r=${n}`);
  }
  function flowers(numbers){
    return numbers.reduce( ( arr, n ) => {
      arr.push(`r=${n}\\cos${n}\\theta`);
      arr.push(`r=${n * -1 }\\cos${n}\\theta`);
      arr.push(`r=${n}\\cos${n/10}\\pi\\theta`);
      return arr;
    }, []);
  }
  function integrals(numbers){
    return numbers.map( n => {
      let abs = Math.abs(n);
      return `y=\\int_{${ abs * -1 }}^{${ abs }}f(t)dx`;
    });
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    window.mandala.calculator = calculator = Desmos.GraphingCalculator(
      document.getElementById('calculator'), {
      keypad: false,
      expressionsCollapsed: true,
      // polarMode: true
    });
    // calculator.setState({"version":3,"graph":{"showGrid":true,"showXAxis":false,"showYAxis":false,"xAxisStep":0,"yAxisStep":0,"xAxisMinorSubdivisions":0,"yAxisMinorSubdivisions":0,"xAxisArrowMode":"NONE","yAxisArrowMode":"NONE","xAxisLabel":"","yAxisLabel":"","xAxisNumbers":false,"yAxisNumbers":false,"polarMode":true,"polarNumbers":false,"degreeMode":true,"projectorMode":false,"squareAxes":true,"viewport":{"xmin":-10,"ymin":-8.527027027027028,"xmax":10,"ymax":8.527027027027028}},"expressions":{"list":[{"id":"47","type":"expression","latex":"t=-0.0333","domain":{"min":"0","max":"1"},"label":"","hidden":true,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false,"sliderMin":"-.5","sliderMax":"0.5","sliderHardMin":true,"sliderHardMax":true,"sliderInterval":"","sliderAnimationPeriod":8000,"sliderLoopMode":"LOOP_FORWARD_REVERSE","sliderPlayDirection":1,"sliderIsPlaying":false},{"id":"20","type":"expression","latex":"y=t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"22","type":"expression","latex":"y=-t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"27","type":"expression","latex":"x=t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"28","type":"expression","latex":"x=-t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"19","type":"expression","latex":"r=t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"30","type":"expression","latex":"r=-t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"32","type":"expression","latex":"r=20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#000000","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"33","type":"expression","latex":"r=-20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"34","type":"expression","latex":"r=-\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"39","type":"expression","latex":"r=\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"dotted","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"42","type":"expression","latex":"r=t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"43","type":"expression","latex":"r=-t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false}]}})
  });

  return {
    graph(){
      let range = parseFloat(document.getElementById('range').value);
      let amount = parseInt(document.getElementById('amount').value);

      calculator.setBlank();
      // range + 1 to alevitate Math.random's inability to produce 1
      // Math.random has a range of [0,1)
      let numbers = randomNumbers(range + 1, amount);
      let expressions = [
        ...lines(numbers),
        ...curves(numbers),
        ...derivative(numbers),
        ...circles(numbers),
        ...flowers(numbers),
        ...integrals(numbers)
      ];
      expressions.filter( ( ex, i, arr ) => arr.indexOf(ex) === i )
        .forEach( exp => calculator.setExpression({
          latex: exp,
          color: randomColor()
        }) );

      // interesting relationship between circle radius and spike tips
      // multiplying the radius by  809/500 or 1.618 gives the coordinates
      // for the intersection point between the curves that form the spikes
      // + .5 adds some padding so that the intersection is not at the edge
      // of the graph
      // phi = 1.618
      let max = ( Math.max(...numbers) + .5 ) * 1.618;
      let min = max * -1;
      // graph's height and width
      let { clientHeight, clientWidth } = document.getElementById('calculator');
      let ratio =   clientWidth/clientHeight;
      // multiplying the domain by the ratio prevents the circles from appearing
      // as ovals, essentially makes the graph's "aspect ratio" 1:1
      min = min > 0 ? min * -1 : min;
      max = max < 0 ? max * -1 : max;
      calculator.setMathBounds({
        left: min * ratio,
        right: max * ratio,
        bottom: min,
        top: max
      });
    },
    screenshot(){
      window.screenshot = calculator.screenshot();
      let a = document.createElement('a');
      a.href = window.screenshot;
      a.download = 'random-mandala';
      document.body.appendChild(a);
      a.click()
      document.body.removeChild(a);
    }
  }
})();