function SanPhamService() {
        this.themSP = function (spNew) {
            return axios({
                method: 'post',
                url: 'https://637369d1348e9472990bbe3b.mockapi.io/Product/',
                data: spNew,
            });
        }
        this.layDSSP = function () {
            return axios({
                method: 'get',
                url: 'https://637369d1348e9472990bbe3b.mockapi.io/Product/',
            });
        }

        this.xoaSP = function (id) {
            return axios({
                method: 'delete',
                url: `https://637369d1348e9472990bbe3b.mockapi.io/Product/${id}`,
            });
        }

        this.xemChiTiet = function(id) {
            return axios({
                method: 'get',
                url: `https://637369d1348e9472990bbe3b.mockapi.io/Product/${id}`,
            });
        }

        this.capNhatSP = function (spCapNhat,id) {
            return axios({
                method: 'post',
                url: `https://637369d1348e9472990bbe3b.mockapi.io/Product/${id}`,
                data: spCapNhat,
            });
        }
}