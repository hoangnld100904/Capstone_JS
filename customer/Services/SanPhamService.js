function SanPhamService() {
    this.layDanhSach = function() {
       return axios({
            method: 'get',
            url: 'https://637369d1348e9472990bbe3b.mockapi.io/Product',
          });
    }
    this.themGioHangID = function(id) {
     return axios({
          method: 'get',
          url: `https://637369d1348e9472990bbe3b.mockapi.io/Product/${id}`,
        }); 
    }
}