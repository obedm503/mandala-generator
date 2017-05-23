document.addEventListener("DOMContentLoaded", ()=>{
  function randomColor(){
    return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }
  function randomNumbers(range, amount){
    return Array(amount)
      .fill('')
      .map( () => Math.floor( range * ( Math.random() * 2 - 1 ) ) );
  }
  function lines(numbers){
    return numbers.map( num => `y=${num}(x+${num})` );
  }
  function curves(numbers){
    return numbers.reduce( ( arr, n ) => {
      // arr.push(`y=-\\sqrt{x^2-${Math.pow(n, 2)}}`);
      // arr.push(`y=\\sqrt{x^2-${Math.pow(n, 2)}}`);
      // arr.push(`x=-\\sqrt{y^2-${Math.pow(n, 2)}}`);
      // arr.push(`x=\\sqrt{y^2-${Math.pow(n, 2)}}`);

      arr.push(`y=-\\left(\\frac{x^2}{${n}}+${n * -1}\\right)`);
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

  window.mandala = {
    screenshot(){
      window.screenshot = calculator.screenshot();
      let a = document.createElement('a');
      a.href = window.screenshot;
      a.download = 'random-mandala';
      document.body.appendChild(a);
      a.click()
      document.body.removeChild(a);
    },
    graph(){
      calculator.setBlank();
      let numbers = randomNumbers(20,1);
      let expressions = [
        ...lines(numbers),
        ...curves(numbers),
        ...derivative(numbers),
        ...circles(numbers),
        ...flowers(numbers)
      ]
      expressions.filter( ( ex, i, arr ) => arr.indexOf(ex) === i )
        .forEach( ex => {console.log(ex);return calculator.setExpression({ latex: ex, color: randomColor() }) });
    }
  };

 var calculator = window.calculator = Desmos.GraphingCalculator(document.getElementById('calculator'), {
    keypad: false,
    expressionsCollapsed: true
  });
  // calculator.setState({"version":3,"graph":{"showGrid":true,"showXAxis":false,"showYAxis":false,"xAxisStep":0,"yAxisStep":0,"xAxisMinorSubdivisions":0,"yAxisMinorSubdivisions":0,"xAxisArrowMode":"NONE","yAxisArrowMode":"NONE","xAxisLabel":"","yAxisLabel":"","xAxisNumbers":false,"yAxisNumbers":false,"polarMode":true,"polarNumbers":false,"degreeMode":true,"projectorMode":false,"squareAxes":true,"viewport":{"xmin":-10,"ymin":-8.527027027027028,"xmax":10,"ymax":8.527027027027028}},"expressions":{"list":[{"id":"47","type":"expression","latex":"t=-0.0333","domain":{"min":"0","max":"1"},"label":"","hidden":true,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false,"sliderMin":"-.5","sliderMax":"0.5","sliderHardMin":true,"sliderHardMax":true,"sliderInterval":"","sliderAnimationPeriod":8000,"sliderLoopMode":"LOOP_FORWARD_REVERSE","sliderPlayDirection":1,"sliderIsPlaying":false},{"id":"20","type":"expression","latex":"y=t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"22","type":"expression","latex":"y=-t^{\\pi^2}x^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"27","type":"expression","latex":"x=t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"28","type":"expression","latex":"x=-t^{\\pi^2}y^{-2}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"19","type":"expression","latex":"r=t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#fa7e19","style":"normal","dragMode":"AUTO","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"30","type":"expression","latex":"r=-t\\frac{\\theta}{\\pi}\\cos5\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"32","type":"expression","latex":"r=20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#000000","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"33","type":"expression","latex":"r=-20t\\frac{\\theta}{\\sqrt{\\left|t\\right|}}","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"34","type":"expression","latex":"r=-\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#2d70b3","style":"dashed","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"39","type":"expression","latex":"r=\\theta t\\cos\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#388c46","style":"dotted","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"42","type":"expression","latex":"r=t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#6042a6","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false},{"id":"43","type":"expression","latex":"r=-t\\theta","domain":{"min":"0","max":"1"},"label":"","hidden":false,"secret":false,"color":"#c74440","style":"normal","dragMode":"NONE","residualVariable":"","regressionParameters":{},"isLogModeRegression":false}]}})

});