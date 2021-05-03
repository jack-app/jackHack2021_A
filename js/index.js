function get_camp(){
  var cookie_list = document.cookie;
  console.log(cookie_list) 
  if (cookie_list == "") {return null}
  var id = cookie_list.split('=')[1];
  return id;
} 
console.log(get_camp)
if (!!get_camp()) {
  window.location.href = '../game.html';
}