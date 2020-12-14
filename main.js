window.onload =　(function() {
  let displayElem = $('.display');
  let numbersElem = $('.command.is-number');
  
  
  // 演算子：＋
  let operatorAddElem = $('.command.is-operator.is-add');
  // 演算子：-
  let operatorSubElem = $('.command.is-operator.is-sub');
  // 演算子：×
  let operatorMultiElem = $('.command.is-operator.is-multi');
  // 演算子：÷
  let operatorDivisionElem = $('.command.is-operator.is-division');
  //　演算子：%
  let operatorRemainElem = $('.command.is-operator.is-remain');
  
  let equalElem = $('.command.is-equal');
  let acElem = $('.command.is-ac');

  // デバッグ用のエレメント
  let leftNumberElem = $('#leftNumber');
  let inputOperatorElem = $('#inputOperator');
  let rightNumberElem = $('#rightNumber');
  let resultNumberElem = $('#resultNumber');

  // 計算結果
  let resultNumber;
  // 計算式の左辺
  let leftNumber;
  // 計算式の右辺
  let rightNumber;
  // 入力した演算子
  let inputOperator;

  log();
  
  numbersElem.on('click', displayNumber);
  operatorAddElem.on('click', saveAddOperator);
  operatorSubElem.on('click', saveSubOperator);
  operatorMultiElem.on('click', saveMultiOperator);
  operatorDivisionElem.on('click', saveDivisionOperator);
  operatorRemainElem.on('click', saveRemainOperator);
  equalElem.on('click', clickEqual);
  acElem.on('click', clickAc);
  
  function clickEqual() {
    calculate();
    flashDisplay();
  }
  
  function clickAc() {
    reset();
    flashDisplay();
  }

  function reset() {
    resultNumber = undefined;
    leftNumber = undefined;
    rightNumber = undefined;
    inputOperator = undefined;
    displayElem.text('0');
    log();
  }

  function calculate() {
    resultNumber = eval(leftNumber + inputOperator + rightNumber);
    displayElem.text(resultNumber);
    log();
  }

  function displayNumber() {
    if (resultNumber !== undefined) {
      reset();
    }
    if (rightNumber === undefined) {
      rightNumber = 0;
    }
    rightNumber = Number(rightNumber + $(this).text());
    displayElem.text(rightNumber);
    log();
  }

  function createCalculation() {
    if (rightNumber === undefined) {
      // 右辺がまだ入力されていない場合
      if (leftNumber === undefined) {
        // 左辺も決まっていない場合、左辺をゼロに決める
        leftNumber = 0;
      }
      return;
    }

    if (leftNumber === undefined) {
      // 左辺が決まっていない場合は右辺を左辺に移動
      leftNumber = rightNumber;
    } else {
      // 左辺が決まっている場合は計算実行
      calculate();
    }

    if (resultNumber !== undefined) {
      // 計算結果が出ている場合、計算結果に対して計算を続けるため、計算結果を左辺に移動
      leftNumber = resultNumber;
    }
    // 計算を続けるため、右辺と計算結果をundefinedに初期化する
    rightNumber = undefined;
    resultNumber = undefined;
    log();
  }

  function saveAddOperator() {
    createCalculation();
    inputOperator = '+';
    log();
    flashDisplay();
  }
  function saveSubOperator() {
    createCalculation();
    inputOperator = '-';
    log();
    flashDisplay();
  }
  function saveMultiOperator() {
    createCalculation();
    inputOperator = '*';
    log();
    flashDisplay();
  }
  function saveDivisionOperator() {
    createCalculation();
    inputOperator = '/';
    log();
    flashDisplay();
  }
  function saveRemainOperator() {
    createCalculation();
    inputOperator = '%';
    log();
    flashDisplay();
  }

  function log() {
    if (leftNumber === undefined) {
      leftNumberElem.text('undefined');
    } else {
      leftNumberElem.text(leftNumber);
    }
    if (inputOperator === undefined) {
      inputOperatorElem.text('undefined');
    } else {
      inputOperatorElem.text(inputOperator);
    }
    if (rightNumber === undefined) {
      rightNumberElem.text('undefined');
    } else {
      rightNumberElem.text(rightNumber);
    }
    if (resultNumber === undefined) {
      resultNumberElem.text('undefined');
    } else {
      resultNumberElem.text(resultNumber);
    }
  }

  function flashDisplay() {
    displayElem.addClass('flashing');
    let remove = function(){
      displayElem.removeClass('flashing');
    };
    setTimeout(remove, 100);
  }
  
});

