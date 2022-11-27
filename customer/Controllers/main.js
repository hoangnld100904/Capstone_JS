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
            // renderCart(mangCart.mangGioHang)
            setLocal()//lưu dữ liệu storage
            console.log(mangCart.mangGioHang)
        })
        .catch(function (error) {
        })
}



