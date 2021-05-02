export default class CampEncampedLocation {
  constructor(arg) {
    this.init()
    if ( typeof arg == "number" ) { this.fetch(arg) }
    // if ( typeof arg == "object" ) { Object.assign(this, arg) }
  }

  init(){
    this.camp_id = null,
    this.latitude = null,
    this.longitude = null
  }

  // 取得
  fetch(id){
    fetch(`https://localhost:80/camp_encamped_locations/${id}`)
    .then( resp => resp.json() )
    .then( data => Object.assign(this, data.camp_encamped_location) )
  }

  // 全取得
  all() {
    fetch(`https://localhost:80/camp_encamped_locations`)
    .then( resp => resp.json() )
    .then( data => data.camp_encamped_locations)
  }

  // 作成
  create(object){ // {camp_id: Number, latitude: Number, longitude: Number}
    this.init()
    Object.assign(this, object)
    this.save()
  }

  save() {
    // credential周り設定したほうが良さそう。
    fetch( 'https://localhost:80/camp_encamped_locations', { method = "POST", body: this.toPostedObject() } )
  }

  toPostedObject(){
    var postedObject = {}
    postedObject.camp_id = this.camp_id
    postedObject.latitude = this.latitude
    postedObject.longitude = this.longitude
    return JSON.stringify(postedObject)
  }

  // update(){

  // }
}