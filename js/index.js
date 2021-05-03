function get_camp(){
  var cookie_list = document.cookie;
  console.log(cookie_list) 
  if (cookie_list == "") {return null}
  var id = cookie_list.split('=')[1];
  return id;
} 
let cid = get_camp()
if (!!cid) {
  window.location.href = `../game.html?camp_id=${cid}`;
}