function save_camp(id){
    document.cookie = 'camp_id='+id;
}

function get_camp(){
    var cookie_list = document.cookie;
    var id = cookie_list.split('=')[1];
    return id;
}