var app = new Vue ({
    el:'#app',
    data:{
        text:'',
        data:[], //沒有預先定義變數
        currentPage:0,
        locations:[],
        currentlocation:''
        
        
    },
    methods:{
        getUniqueList(){ 
        // getUniqueList 取得唯一值
        const locations= new Set(); //new Set陣列內容不得重複
        const vm=this;
        vm.data.forEach((item,i) =>{
            locations.add(item.Zone)

        })
        console.log(locations)
        vm.locations= Array.from(locations);

        }

    },
    computed:{
        filiterData(){ //也可以等於filiterData()
            const vm = this
            //先過濾
            let items=[];
            if(vm.currentlocation !==''){
                items=vm.data.filter((item,i) =>{
                return item.Zone == vm.currentlocation //回傳為turn的值
            })

            } else {
                items=vm.data
            }



            //有幾頁
            //每頁的資料內容
            // newdata=[[1...],[2...],[3...]]
            // 假如currentPage為0時，便會取得第一筆資料
            
            const newData =[]
            items.forEach((item,i) => {
                if(i % 10 === 0){
                    newData.push([])
                }
                // 上方為: 假設每次取餘數為0時，會增加一個空陣列
                const page =parseInt(i / 10)
                // 假設0~10時，變退到第一個陣列，10/10=1(page)類推
                newData[page].push(item)
                
                
            });
            console.log(newData)
            return newData
        
            
        }

    }
    ,created(){
        const vm=this;
        axios.get('https://data.kcg.gov.tw/api/3/action/help_show?name=datastore_search')
        .then(function (response) {
        // handle success
        console.log(response);
        console.log(this);
        vm.data=response.data.result.records
        console.log(vm.data)
        vm.getUniqueList() //需在資料掛載後就執行唯一值取得//---->!重要!
      })
        .catch(function (error) {
    // handle error
        console.log(error);
    })
       .then(function () {
    // always executed
    });

    }
})
