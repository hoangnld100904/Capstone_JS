function SanPhamService() {
    this.layDanhSach = function() {
       return axios({
            method: 'get',
            url: 'https://636a3c5ec07d8f936d974716.mockapi.io/QLBH',
          });
    }

    this.chiTietGioHang = function(id) {
        return axios({
             method: 'get',
             url: `https://636a3c5ec07d8f936d974716.mockapi.io/QLBH/${id}`,
           });
     }
}