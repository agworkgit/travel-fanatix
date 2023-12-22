const btn = $('#btn')
const overlay = $('#overlay')

btn.on('click', function(){

overlay.removeClass('hidden')

setTimeout(() => {
overlay.addClass('hidden')
}, 5000);

})