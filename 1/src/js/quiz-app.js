var quizApp = quizApp || {};

;(function($, window, document, undefined) {

	quizApp.questionsURL = undefined;
	
	quizApp.init = function(options) {
		quizApp.questionsURL = options.questionsURL;
	
		setTimeout(function() {$('#questions').readQuestions(quizApp.questionsURL);}, 100);
	};

})(jQuery, window, document);