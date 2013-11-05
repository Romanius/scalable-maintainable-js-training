/*
 * Questions read plugin for JS Training.
 */
;(function ( $, window, document, undefined ) {
 
    var pluginName = "readQuestions",
        defaults = {
            questionsURL: "https://dl.dropboxusercontent.com/s/ijr0wipkq7biev6/questions.json?token_hash=AAEcx4elb7-PDjjfJJuA4CfKn9drfBhKrwEKgm_RlesuBg",
            wrapQuestionElem: '<h3></h3>',
            wrapAnswerElem: '<span></span>'
        };
 
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.current = 0;
        this.questions = [];
        this.result = 0;
        
        this.init();
    }
 
    Plugin.prototype.init = function () {
		var self = this;
		if (this.options.questionsURL) {
			$.getJSON(this.options.questionsURL, function (data) {
				self.questions = data;
				//console.log(self.questions);
				self.next.apply(self);
			}).error(function() {
				console.log("Error loading questions data by URL " + this.options.questionsURL);
			});
		}
		else {
			console.log("Questions URL is not defined");
		}
		
		$(this.element, ' span').on('click', function(event) {
			var answerIndex = $(event.target).data('index');
			self.result += self.questions[self.current].points[answerIndex];
			//console.log(self.result);
		
			self.current++;
			self.next();
		});
    };
    
    Plugin.prototype.next = function () {
		if (this.current >= this.questions.length) {
			// Sorry wasn't able to finish homework in a proper way.
			$(this.element).html('').html('Results: ' + this.result);
			return;
		}
    
		var opts = this.options;
		var elem = this.element;
    
		var question = this.questions[this.current];
		//console.log(question);
		$(elem).html('');
		$(elem).append( $(opts.wrapQuestionElem).append( question.question ) );
		$(question.answers).each( function(index) {
			$(elem).append( $(opts.wrapAnswerElem).data('index', index).append( this ) ).append( $('<br/>') );
		});
    };
 
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName, 
                new Plugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );
