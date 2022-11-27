getLocal()


function renderCart(mang) {
    var content = ''
    var tongTien = 0
    mang.map(function (sp, index) {
        tongTien += sp.price * sp.quantity
        content += `<tr>
        <td style="width: 25%">${sp.name}</td>
        <td style="width:20%">${sp.price * sp.quantity}</td>
        <td><img src="${sp.img}" style="witdh:120px; height: 120px " alt=""></td>
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
    getMyEle('#tblDanhSachSP').innerHTML = content //nếu muốn lấy tổng tiền thì phải tạo biến trong map, chứ ko tạo trực tiếp html trong map =>sẽ render 1 hàng cho mỗi lần thêm sp
    document.getElementById('footer').innerHTML=`<div><b>Thành tiền:</b> ${tongTien}</div>
    <div><button class="btn btn-default" onclick="thanhToan(${tongTien})" id="btnClear">Thanh Toán</button></div>`
}
function tangSL(index) {// lấy index trong map
    mangCart.tangSL(index)// chỉ tăng số lượng còn push hay ko phụ thuộc vào hàm themGioHang (tránh lặp đi lặp lại code chậm ui)
    renderCart(mangCart.mangGioHang)
}

function giamSL(index) {
    mangCart.giamSL(index)
    renderCart(mangCart.mangGioHang)
}
function thanhToan(tongTien) {
    if (mangCart.mangGioHang.length == 0) {
        alert('Bấm vào thêm giỏ hàng')
    } else {
        if (confirm('Bạn có đồng ý thanh toán ' + tongTien)) {
            mangCart.mangGioHang = []
            alert('Mua hàng thành công, đơn hàng sẽ được giao trong 3 đến 5 ngày')
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