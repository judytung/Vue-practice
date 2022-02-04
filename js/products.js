const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'judyhexschoolforvue'; // 加入個人 API Path
const  token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    // headers 夾帶 token
    // axios 的 toeken 只要發送一次
    axios.defaults.headers.common['Authorization'] = token;

// 建立 Vue 元件

const app = {
    data () {
        return {
            products:[],
            tempProducts:{}
        }
    },
    methods : {
        getProducts () {
            axios.get(`${url}/api/${path}/admin/products`)
            .then((res) => {
            // console.log(res.data);
            this.products = res.data.products;
            })
            .catch((err) => {
            console.dir(err);
            })
            // all 物件寫法
            // axios.get(`${url}/api/${path}/admin/products/all`)
            // .then((res) => {
            // this.products = res.data.products;
            // Object.values(this.products).forEach((item) => {
            //     console.log(item);
            // })
            // })
            // .catch((err) => {
            // console.dir(err);
            // })
        },
        removeProduct (item) {
            axios.delete(`${url}/api/${path}/admin/product/${item.id}`)
            .then((res) => {
            alert(res.data.message);
            this.getProducts();
            
            })
            .catch((err) => {
            console.dir(err);
            alert(err.data.message)
            })
        },
        checkLogin(params) {
            axios.post(`${url}/api/user/check`)
            .then(() => {
              // console.log(res.data);
              this.getProducts();
            })
            .catch((err) => {
              console.dir(err);
              alert(err.data.message);
            })
          }
    },
   mounted () {
    this.checkLogin();
    
    }
}
Vue.createApp(app).mount('#app')