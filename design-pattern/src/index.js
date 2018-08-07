/*class Car{
  constructor(number,name){
    this.number = number;
    this.name = name;
  }
}

class Zhuanche extends Car{
  constructor(number,name,price){
    super(number,name);
    this.price = 2;
  }
}

class Kuaiche extends Car{
  constructor(number,name,price){
    super(number,name);
    this.price = 3;
  }
}

class Trip{
  constructor(Car){
    this.car = Car;
  }
  start(){
    console.log(`行程开始，名称:${this.car.name},车牌号:${this.car.number},单价:${this.car.price}`);
  }
  end(){
    console.log(`行程结束，金额:${this.car.price*5}元`);
  }
}

let a = new Zhuanche(100,'桑塔纳');
let b = new Kuaiche(200,'捷达');
let trip = new Trip(b);
trip.start();
trip.end();*/
// 摄像头
class Camera{
  shot(car){
    return {
      num:car.num,
      inTime:Date.now()
    }
  }
}
// 出口显示屏
class Screen{
  show(car,inTime){
    console.log("车牌号:",car.num,"停车时长:",Date.now()-inTime);
  }
}

class Park{
  constructor(floors){
    this.floors = floors||[]
    this.camera = new Camera()
    this.screen = new Screen()
    this.carList = {}  // 存储摄像头识别的车辆信息
  }
  in(car){
    // 通过摄像头识别车辆信息
    const info = this.camera.shot(car)
    const i = parseInt(Math.random()*100)
    const place = this.floors[0].places[i]
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }
  out(car){
    const info = this.carList[car.num]
    const place = info.place
    place.out()
    // 显示时间
    this.screen.show(car,info.inTime)
    // 清空记录
    delete this.carList[car.num]
  }
  emptyNum(){
    return this.floors.map(floor=>{
      return `${floor.index}层还有${floor.emptyPlaceNum()}个车位`
    }).join(' | ')
  }
}

class Floor{
  constructor(index,places){
    this.index = index
    this.places = places
  }
  emptyPlaceNum(){
    let num = 0
    this.places.forEach(p=>{
      if(p.empty){
        num = num+1
      }
    })
    return num;
  }
}

class Place{
  constructor(){
    this.empty = true
  }
  in(){
    this.empty = false
  }
  out(){
    this.empty = true
  }
}

class Car{
  constructor(num){
    this.num = num
  }
}

// 初始化停车场
const floors=[]
for(let i=0;i<3;i++){
  const places = []
  for(let j=0;j<100;j++){
    places[j] = new Place()
  }
  floors[i]=new Floor(i+1,places)
}

const park = new Park(floors)

// 初始化车辆
const car1=new Car(100)
const car2=new Car(200)
const car3=new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
setTimeout(()=>{
  park.out(car3)
})

