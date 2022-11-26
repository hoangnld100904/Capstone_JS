const spService = new SanPhamService()
const mangCart = new DanhSachGioHang()
function getMyEle(select) {
    return document.querySelector(select)
}

function setLocal() {
    localStorage.setItem('DSGH', JSON.stringify(mangCart.mangGioHang))
}

function getLocal() {
    if (localStorage.getItem('DSGH') != null) {
        mangCart.mangGioHang = JSON.parse(localStorage.getItem('DSGH'))
        renderCart(mangCart.mangGioHang)//lấy dữ liệu storage
    }
}
getLocal()

function layDanhSach() {
    spService.layDanhSach().then(function (result) {

        hienThiDS(result.data)
        console.log(result.data)
    })
        .catch(function (error) {
            console.log(error)
        })
}

layDanhSach()

function hienThiDS(mangSP) {
    var content = ''
    mangSP.map(function (sp) {
        content += `<div class="item-card">
        <img src="${sp.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${sp.name}</h5>
          <p class="card-text">${sp.desc}</p>
        </div>
        <div class="card-bottom">
          <a class="btn btn-primary" onclick="themGioHang(${sp.id})">Thêm vào giỏ hàng</a>
        </div>
        </div>`
    })

    getMyEle('div.cards').innerHTML = content;
}

function locSanPham() {
    var mangLoc = [];
    var loc = getMyEle('#slSp').value.toLowerCase();
    console.log(loc)
    spService.layDanhSach().then(function (result) {
        result.data.map(function (sp) {

            if (sp.type.toLowerCase() == loc) {
                // alert('thành côngs')
                mangLoc.push(sp)
                return hienThiDS(mangLoc)
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

    spService.themGioHangID(id)
        .then(function (result) {
            result.data.quantity = 1 // gán qty = 1
            var gioHang = new Cart(result.data.id, result.data.name, result.data.price, result.data.img, result.data.quantity)
            var viTri = mangCart.kiemTraViTri(result.data.id)//kiểm tra data.id(trong mảng) == id(truyền vào) hay ko, nếu ko trùng trả về -1
            mangCart.kiemTraTrung(id, gioHang,)// nếu trùng tăng quantity lên, ngc lại -1 push vào mảng
            renderCart(mangCart.mangGioHang)
            setLocal()//lưu dữ liệu storage
            console.log(mangCart.mangGioHang)
        })
        .catch(function (error) {

        })
}
function tangSL(index) {// lấy index trong map
    mangCart.tangSL(index)// chỉ tăng số lượng còn push hay ko phụ thuộc vào hàm themGioHang (tránh lặp đi lặp lại code chậm ui)
    renderCart(mangCart.mangGioHang)
}

function giamSL(index) {
    mangCart.giamSL(index)
    renderCart(mangCart.mangGioHang)
}

function renderCart(mang) {
    var content = ''
    var tongTien = 0
    mang.map(function (sp, index) {
        tongTien += sp.price * sp.quantity
        content += `<tr>
        <td style="width: 25%">${sp.name}</td>
        <td style="width:20%">${sp.price}</td>
        <td><img src="${sp.img}" alt=""></td>
        <td>
        <div class="d-flex">
        <button class="btn" onclick="tangSL(${index})"><i class="fa-solid fa-plus"></i></button>
        <input id="inpSL" class="form-control text-center" value="${sp.quantity}" style="width: 55px;">
        <button class="btn" onclick="giamSL(${index})"><i class="fa-solid fa-minus"></i></button>
        </div></td>
        <td><button class="btn btn-danger" onclick="xoaSP(${index})">Xóa</button></td>
      </tr>
      `
    })
    getMyEle('#tblDanhSachSP').innerHTML = content + `<td><b>Thành tiền:</b> ${tongTien}</td>
    <td><button class="btn btn-danger" onclick="thanhToan(${tongTien})" id="btnClear">Thanh Toán</button></td>` //nếu muốn lấy tổng tiền thì phải tạo biến trong map, chứ ko tạo trực tiếp html trong map =>sẽ render 1 hàng cho mỗi lần thêm sp

}

function thanhToan(tongTien) {
    if (mangCart.mangGioHang.length == 0) {
        alert('Bấm vào thêm giỏ hàng')
    } else {
        if (confirm('Bạn có đồng ý thanh toán ' + tongTien)) {
            mangCart.mangGioHang = []
            getMyEle('#btnClear').style.display = 'none'
            setLocal()
            getLocal()
        }
    }
}

function xoaSP(index) {
    mangCart.mangGioHang.splice(index, 1)
    setLocal()
    getLocal()
}

document.querySelector('.form-control p').onclick = function () {
    document.querySelector(' .modal__content').style.display = 'block'
    document.querySelector(' .modal__control').style = 'background-color: #8EC5FC'
    document.querySelector(' .modal__control').style = 'background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);'
    document.querySelector('  .modal__control .close').style.display = 'block'
    document.querySelector('.modal__control p').style = 'text-align:left'
}

document.querySelector(' .modal__control span.close').onclick = function () {
    document.querySelector(' .modal__content').style.display = 'none'
    document.querySelector(' .modal__control').style = ''
    document.querySelector(' .modal__control').style = ''
    document.querySelector(' .modal__control .close').style.display = 'none'
    document.querySelector('.modal__control p').style = 'text-align:right'
}