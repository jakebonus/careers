/*
* toWords jQuery Plugin v0.2
*
* author: Ricardo Andrés Bello (@ricardoaandres)
* 
* first release: May, 2012
*/

(function ($, undefined) {

  $.fn.toWords = function(paramA, paramB) {
    if (typeof(paramA) == 'function') {
      options = {};
      callback = paramA;
    }else{
      options = paramA;
      callback = paramB;
    }

    var config = $.extend({}, $.fn.toWords.config, options);
    var number = 0;
    return this.each(function(){
      var isNegative = $(this).text().substring(0, 1) == '-' ? true : false;
      var number = $(this).text().replace(/[^0-9)]/g, '').split('');

      stringedNumber = createString(number, isNegative, config);
      appendString(stringedNumber, config, $(this));
      
      if (callback) {
        callback();
      }
    });
  }

  $.fn.toWords.config = {
    reverse: false,
    appendTo: undefined
  }

  function createString(number, isNegative, config) {
    var stringed = '', zeros = '';
    var times = number.length;

    if (times <= 9) {
      for ( var cntr = 9 - times; cntr !== 0; cntr-- ){
        zeros += '0';
      }

      if (config.reverse) {
        number = number.reverse().join( '' );
        number = ( zeros + number ).split( '' );
      }else{
        number = zeros + number.join( '' );
        number = number.split( '' );
      }

      stringed += stringNumber(number[0], number[1], number[2]);
      stringed += (number[0] == 0 && number[1] == 0 && number[2] == 0) 
        ? '' 
        : ' million ';
      stringed += stringNumber(number[3], number[4], number[5]);
      stringed += (number[3] == 0 && number[4] == 0 && number[5] == 0) 
        ? '' 
        : ' thousand ';
      stringed += stringNumber(number[6], number[7], number[8]);
    }else{
      stringed = 'By now max number is 999,999,999';
    }

    return (isNegative) ? 'minus ' + stringed : stringed;
  }

  function stringNumber(numb1, numb2, numb3) {
    var unit = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        tens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        decs = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (numb1 != 0) {
      numb1 = unit[numb1] + ' hundred ';
    }else{
      numb1 = '';
    }

    if (numb2 != 0) {
      if (numb2 == 1) {
        numb2 = tens[numb3];
        numb3 = '';
      }else{
        numb2 = decs[numb2];

        if (numb3 != 0) {
          numb3 = '-' + unit[numb3];
        }else{
          numb3 = '';
        }
      }
    }else{
      numb2 = '';

      if (numb3 != 0) {
        numb3 = unit[numb3];
      }else{
        numb3 = '';
      }
    }

    return (numb1 + numb2 + numb3 == 0) ? '' : numb1 + numb2 + numb3;
  }

  function appendString(string, config, elem) {
    if (config.appendTo) {
      if (typeof(appendTo) == 'string') {
        $(appendTo).append(string);
      }else{
        appendTo.append(string);
      }
    }else{
      $(elem).text(string);
    }
  }

})(jQuery);



































