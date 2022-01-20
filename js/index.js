
const url = 'https://vue3-course-api.hexschool.io/v2'; // 加入站點
const path = 'judyhexschoolforvue'; // 加入個人 API Path
const  token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(token);
    // headers 夾帶 token
    // axios 的 toeken 只要發送一次
    axios.defaults.headers.common['Authorization'] = token;


  
// 建立 Vue 元件
const app = {
    data() {
        return {
            user:{
                username: '',
                password: ''
            },
        }
    },
    methods: {
        login() {  // 發送 api 至遠端，登入並儲存 token 
            axios.post(`${url}/admin/signin`, this.user)
            // 成功結果
            .then((res) => {
            console.log(res);
            const { token, expired } = res.data; // 解構寫法
            console.log(token, expired);
            document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
            window.location = 'products.html';
            })
            // 失敗結果
            .catch((err) => {
            console.dir(err);
            alert(err.data.message); // 登入錯誤提示
            })
        },
        checkLogin(params) {
          axios.post(`${url}/api/user/check`)
          .then((res) => {
            console.log(res.data);
            window.location = 'products.html';
          })
          .catch((err) => {
            console.dir(err);
            alert(err.data.message);
          })
        }
    },

}


Vue.createApp(app).mount('#app'); //  定義 Vue 元件，使用 mount 指定掛載到 app 這個 id 


