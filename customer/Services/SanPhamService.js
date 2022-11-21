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
          url: `https://636a3c5ec07d8f936d974716.mockapi.io/QLBH/${id}`,
        }); 
    }
}