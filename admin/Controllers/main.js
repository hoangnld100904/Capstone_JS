var spService = new SanPhamService()

function getMyEle(select) {
    return document.querySelector(select)
}

function layDanhSachSP() {
    spService.layDSSP().then(function(reult) {
        renderSP(reult.data)
    })
}
layDanhSachSP()

function renderSP(mang) {
    var content = '';
    var count = 0;
    mang.map(function(sp, index) {
        content+= `<tr>
        <td>${++count}</td>
        <td>${sp.name}</td>
        <td>${sp.price}</td>
        <td><img src="${sp.img}" alt="img" class="img-fluid";
        height: auto;"</td>
        <td>${sp.desc}</td>
        <td class="d-flex justify-content-center"><button class="btn btn-danger mr-2" onclick="xoaSP(${sp.id})">Xóa</button>
        <button class="btn btn-success" onclick="xemChiTiet(${sp.id})">Xem</button>
        </td>
        </tr>`
    })
    getMyEle('#tblDanhSachSP').innerHTML = content;
}

function xoaSP(id) {
    spService.xoaSP(id).then(function(result) {
        layDanhSachSP()    
    })
}
function themSanPham() {//name,price,screen,backCamera,frontCamera,img,desc,type
    var name = getMyEle('#inpName').value
    var price = getMyEle('#inpPrice').value
    var screen = getMyEle('#inpScreen').value
    var backCamera = getMyEle('#inpBackCam').value
    var frontCamera = getMyEle('#inpFrontCam').value
    var img = getMyEle('#inpImg').value
    var desc = getMyEle('#inpDesc').value
    var type = getMyEle('#inpType').value
    var sp = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type)
    console.log(sp)
    spService.themSP(sp).then(function(result) {
        document.querySelector('.modal-header .close').click()
        
        layDanhSachSP()
    })
    .catch(function(error) {
        
    })
    
}

function capNhatSanPham(id) {
    var name = getMyEle('#inpName').value
    var price = getMyEle('#inpPrice').value
    var screen = getMyEle('#inpScreen').value
    var backCamera = getMyEle('#inpBackCam').value
    var frontCamera = getMyEle('#inpFrontCam').value
    var img = getMyEle('#inpImg').value
    var desc = getMyEle('#inpDesc').value
    var type = getMyEle('#inpType').value
    var spCapNhat = new SanPham(name,price,screen,backCamera,frontCamera,img,desc,type)
    spService.capNhatSP(id,spCapNhat).then(function(result) {
        getMyEle('.modal-header .close').click()
        
        layDanhSachSP()
    })
}

getMyEle('#openProduct').onclick = function() {
    reset()
    getMyEle('.modal-footer').innerHTML = `<button type="button" class="btn btn-primary" onclick="themSanPham()" id="btnLuu">Lưu</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
}

function xemChiTiet(id) {
    spService.xemChiTiet(id).then(function(result) {
        getMyEle('#openProduct').click()
        getMyEle('#btnLuu').style = 'display:none'
        getMyEle('.modal-footer').innerHTML = `<button class="btn btn-success" id="btnCapNhat" onclick="capNhatSanPham(${id})">Cập nhật</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
        getMyEle('#inpName').value = result.data.name
        getMyEle('#inpPrice').value = result.data.price
        getMyEle('#inpScreen').value =  result.data.screen
        getMyEle('#inpBackCam').value =  result.data.backCamera
        getMyEle('#inpFrontCam').value =  result.data.frontCamera
        getMyEle('#inpImg').value =  result.data.img
        getMyEle('#inpDesc').value =  result.data.desc
        getMyEle('#inpType').value =  result.data.type.toLowerCase()// viết về chữ hoa để so sánh
        console.log(result.data.type)
    })
}

function reset() {
    getMyEle('#inpName').value = '' 
   getMyEle('#inpPrice').value = ''
    getMyEle('#inpScreen').value = ''
    getMyEle('#inpBackCam').value = ''
   getMyEle('#inpFrontCam').value = ''
   getMyEle('#inpImg').value = ''
  getMyEle('#inpDesc').value = ''
   getMyEle('#inpType').value = ''
}