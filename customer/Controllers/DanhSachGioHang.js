function DanhSachGioHang() {
    this.mangGioHang = []
    this.themGH = function(sp) {
        this.mangGioHang.push(sp)
    }
    this.kiemTraViTri = function(id) {
        var viTri = -1;
        viTri = this.mangGioHang.findIndex(function(sp) {
            return sp.id == id
        })
        return viTri// trả về vị trí trong mảng
    }

    this.kiemTraTrung = function(id,sp) {
        var viTri = this.kiemTraViTri(id)
        if (viTri > -1) {
         this.mangGioHang[viTri].quantity++ ;
        } else {
            this.themGH(sp)
        }
    }

    this.tangSL = function(index) {
         this.mangGioHang[index].quantity++ 
    }

    this.giamSL = function(index) {
        var soLuongGioHang = this.mangGioHang[index].quantity;
         if(soLuongGioHang == 1 || soLuongGioHang == 0){
            confirm('Đừng lùi về 0 nữa')
            this.mangGioHang[index].quantity = 1 ;
         }else{
            this.mangGioHang[index].quantity--       
        }
        }
    }
