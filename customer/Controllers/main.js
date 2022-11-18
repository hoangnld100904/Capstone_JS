const spService = new SanPhamService()
const mangGioHang = []

function getMyEle() {
    return document.querySelector(select)
}

function layDanhSach() {
    spService.layDanhSach().then(function (result) {
        hienThiTable(result.data)
        console.log(result.data)
    })
        .catch(function (error) {
            console.log(error)
        })
}

layDanhSach()

function hienThiTable(mangSP) {
    var content = ''
    mangSP.map(function (sp) {
        content += `<div class="col-4">
        <div class="card" style="width: 18rem;">
        <img src="${sp.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${sp.name}</h5>
          <p class="card-text">${sp.desc}</p>
          <a class="btn btn-primary" onclick="themGioHang(${sp.id})">Thêm vào giỏ hàng</a>
        </div>
      </div></div>`
    })

    document.querySelector('.container .row').innerHTML = content;
}

function locSanPham() {
    var mangLoc = [];
    var loc = document.querySelector('#slSp').value
    spService.layDanhSach().then(function (result) {
        result.data.map(function (sp) {
            if (sp.type == loc) {
                // alert('thành côngs')
                mangLoc.push(sp)
                return hienThiTable(mangLoc)
            } else if (loc == '') {
                layDanhSach()
            }
        })

    })
        .catch(function (error) {
            console.log(error)
        })
}

function themGioHang(id) {
    spService.chiTietGioHang(id).then(function (result) {
        var cartItem = {
            product: {
                id: result.data.id,
                img: result.data.img,
                name: result.data.name,
                price: result.data.price,
                name: result.data.name,
            },
            quantity: 1,
            tinhTong: function () {
                return this.product.price * this.quantity
            }
        }

        var viTri = -1;
        viTri = mangGioHang.findIndex(function (sp) {
            return sp.product.id == id
        })

        if (viTri > -1) {
            mangGioHang[viTri].quantity++
        } else {
            mangGioHang.push(cartItem)
        }
        console.log(mangGioHang)
        renderCart(mangGioHang)

    })
        .catch(function (error) {
            console.log(error)
        })
}

function renderCart(mang) {
    var content = ''
    var tongTien = 0
    mang.map(function (sp) {
        content += `<tr>
        <td><img src="" alt=""></td>
        <td>${sp.product.name}</td>
        <td>${sp.quantity}</td>
        <td>${sp.product.price}</td>
        
      </tr>`
        tongTien += sp.tinhTong()
    })

    document.querySelector('#tblDanhSachSP').innerHTML = content
    console.log(tongTien)
}

document.querySelector('.modal__control p').onclick = function () {
    document.querySelector(' .modal__content').style.display = 'block'
    document.querySelector(' .modal__control').style = 'background-color: #8EC5FC'
    document.querySelector(' .modal__control').style = 'background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);'
    document.querySelector('  .modal__control .close').style.display = 'block'
    document.querySelector('.modal__control p').style = 'text-align:left'
}

document.querySelector(' .modal__control .close').onclick = function () {
    document.querySelector(' .modal__content').style.display = 'none'
    document.querySelector(' .modal__control').style = ''
    document.querySelector(' .modal__control').style = ''
    document.querySelector(' .modal__control .close').style.display = 'none'
    document.querySelector('.modal__control p').style = 'text-align:right'
}
